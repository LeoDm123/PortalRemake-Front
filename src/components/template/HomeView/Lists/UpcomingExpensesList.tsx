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
    isToday,
    endOfMonth,
    differenceInWeeks,
} from 'date-fns'
import formatNumber from '@/utils/hooks/formatNumber'
import useFormatDate from '@/utils/hooks/formatDate'
import Select from '@/components/ui/Select'
import type { SingleValue } from 'react-select'

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

    while (isBefore(nextDate, today) || isToday(nextDate)) {
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

const calculateWeeklyAmount = (expense: Expense, timeFrame: string): number => {
    const today = new Date()
    const weeksRemainingInMonth =
        differenceInWeeks(endOfMonth(today), today) + 1
    const weeksRemainingInYear =
        52 - differenceInWeeks(today, new Date(today.getFullYear(), 0, 1))

    switch (timeFrame) {
        case 'Mes':
            return expense.monto * weeksRemainingInMonth
        case 'Año':
            return expense.monto * weeksRemainingInYear
        default:
            return expense.monto
    }
}

const UpcomingExpensesList = () => {
    const [email, setEmail] = useState<string>('')
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [timeFrame, setTimeFrame] = useState<string>('Mes')
    const format = formatNumber()
    const formatDate = useFormatDate()

    const timeFrameOptions = [
        { value: 'Mes', label: 'Mes' },
        { value: 'Semana', label: 'Semana' },
        { value: 'Año', label: 'Año' },
    ]

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

            setExpenses(allExpenses)
        }

        fetchExpensesData()
    }, [email])

    const getNextPaymentsWithinCurrentTimeFrame = () => {
        const today = new Date()
        const nextPayments = expenses.filter((expense) => {
            const nextPaymentDate = calculateNextPaymentDate(
                new Date(expense.fechaPago),
                expense.repetir,
            )
            if (!nextPaymentDate) return false

            switch (timeFrame) {
                case 'Mes':
                    return isSameMonth(nextPaymentDate, today)
                case 'Semana':
                    return isBefore(nextPaymentDate, addWeeks(today, 1))
                case 'Año':
                    return isBefore(nextPaymentDate, addMonths(today, 12))
                default:
                    return false
            }
        })

        return nextPayments
    }

    const nextPayments = getNextPaymentsWithinCurrentTimeFrame()

    const handleTimeFrameChange = (
        selectedOption: SingleValue<{ value: string; label: string }>,
    ) => {
        if (selectedOption) {
            setTimeFrame(selectedOption.value)
        }
    }

    return (
        <div>
            <div
                style={{
                    display: 'Flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                }}
            >
                <h5 style={{ marginBottom: 5 }}>Próximos Vencimientos</h5>
                <Select
                    options={timeFrameOptions}
                    onChange={handleTimeFrameChange}
                    defaultValue={timeFrameOptions.find(
                        (option) => option.value === 'Mes',
                    )}
                    size="sm"
                />
            </div>
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
                                      format(
                                          expense.repetir === 'Semanalmente'
                                              ? calculateWeeklyAmount(
                                                    expense,
                                                    timeFrame,
                                                )
                                              : expense.monto / expense.cuotas,
                                      )
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
