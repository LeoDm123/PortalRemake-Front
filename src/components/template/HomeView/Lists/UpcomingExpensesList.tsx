import React, { useEffect, useState } from 'react'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import { fetchExpenses } from '@/api/api'
import {
    addDays,
    addWeeks,
    addMonths,
    isBefore,
    isSameMonth,
    differenceInMonths,
} from 'date-fns'
import formatNumber from '@/utils/hooks/formatNumber'
import useFormatDate from '@/utils/hooks/formatDate'

interface User {
    email: string
    invites: Invite[]
}

interface Invite {
    email: string
    _id: string
}

interface Expense {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    cuotas: number
    fechaPago: Date
    comentarios: string
}

const calculateNextPaymentDate = (
    fechaPago: Date,
    repetir: string,
): Date | null => {
    const fecha = new Date(fechaPago)
    const today = new Date()
    let nextDate = fecha

    while (isBefore(nextDate, today)) {
        switch (repetir) {
            case 'Diariamente':
                nextDate = addDays(nextDate, 1)
                break
            case 'Semanalmente':
                nextDate = addWeeks(nextDate, 1)
                break
            case 'Mensualmente':
                nextDate = addMonths(nextDate, 1)
                break
            case 'Anualmente':
                nextDate = addMonths(nextDate, 12)
                break
            default:
                return null
        }
    }

    return nextDate
}

const calculateInstallmentNumber = (
    fechaPago: Date,
    repetir: string,
    cuotas: number,
): string => {
    const today = new Date()
    const fecha = new Date(fechaPago)
    let paidInstallments = 0

    switch (repetir) {
        case 'Diariamente':
            paidInstallments = Math.floor(
                (today.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24),
            )
            break
        case 'Semanalmente':
            paidInstallments = Math.floor(
                (today.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24 * 7),
            )
            break
        case 'Mensualmente':
            paidInstallments = differenceInMonths(today, fecha)
            break
        case 'Anualmente':
            paidInstallments = Math.floor(differenceInMonths(today, fecha) / 12)
            break
        default:
            return `0/${cuotas}`
    }

    const currentInstallment = Math.min(paidInstallments + 1, cuotas)
    return `${currentInstallment}/${cuotas}`
}

const UpcomingExpensesList = () => {
    const [email, setEmail] = useState<string>('')
    const [expenses, setExpenses] = useState<Expense[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
    }, [])

    useEffect(() => {
        const fetchExpensesData = async () => {
            const user: User = JSON.parse(localStorage.getItem('user') || '{}')
            const invData = user.invites || []

            const allExpenses: Expense[] = []

            const fetchUserExpenses = async (
                userEmail: string,
            ): Promise<Expense[]> => {
                try {
                    const expenseData = await fetchExpenses(userEmail)
                    if (Array.isArray(expenseData)) {
                        return expenseData
                    } else if (expenseData && expenseData.egresos) {
                        return expenseData.egresos
                    } else {
                        console.error(
                            'Unexpected response format:',
                            expenseData,
                        )
                        return []
                    }
                } catch (error) {
                    console.error('Error fetching expenses:', error)
                    return []
                }
            }

            const userExpenses = await fetchUserExpenses(user.email)
            allExpenses.push(...userExpenses)

            for (const invite of invData) {
                if (invite.email) {
                    const inviteExpenses = await fetchUserExpenses(invite.email)
                    allExpenses.push(...inviteExpenses)
                }
            }

            console.log('Fetched expenses: ', allExpenses) // Log for debugging
            setExpenses(allExpenses)
        }

        fetchExpensesData()
    }, [email])

    const getNextPaymentsWithinCurrentMonth = () => {
        const today = new Date()
        const nextPayments = expenses.filter((expense) => {
            const nextPaymentDate = calculateNextPaymentDate(
                new Date(expense.fechaPago),
                expense.repetir,
            )
            console.log(
                'Next payment date for expense ',
                expense._id,
                ' is ',
                nextPaymentDate,
            ) // Log for debugging
            return nextPaymentDate && isSameMonth(nextPaymentDate, today)
        })

        console.log('Next payments within current month: ', nextPayments) // Log for debugging
        return nextPayments
    }

    const nextPayments = getNextPaymentsWithinCurrentMonth()

    return (
        <div>
            <h5 style={{ marginBottom: 5 }}>
                Próximos Vencimientos Dentro del Mes Corriente
            </h5>
            <Table>
                <THead>
                    <Th>Comentarios</Th>
                    <Th>Fecha de Vencimiento</Th>
                    <Th>Monto de la Cuota</Th>
                    <Th>Nro de Cuota</Th>
                </THead>
                <TBody>
                    {nextPayments.map((expense) => (
                        <tr key={expense._id}>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.comentarios}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {formatDate(
                                    calculateNextPaymentDate(
                                        new Date(expense.fechaPago),
                                        expense.repetir,
                                    ) as Date,
                                )}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.divisa === 'ARS'
                                    ? 'ARS ' +
                                      format(expense.monto / expense.cuotas)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {calculateInstallmentNumber(
                                    new Date(expense.fechaPago),
                                    expense.repetir,
                                    expense.cuotas,
                                )}
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default UpcomingExpensesList
