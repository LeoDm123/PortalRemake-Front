import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import { fetchExpenses } from '@/api/api'
import { addDays, addWeeks, addMonths, isBefore } from 'date-fns'
import formatNumber from '@/utils/hooks/formatNumber'
import useFormatDate from '@/utils/hooks/formatDate'
import calculateNextPaymentDate from '@/utils/hooks/calculateNextPaymentDay'

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

const ExpenseList = () => {
    const [email, setEmail] = useState<string>('')
    const [invData, setInvData] = useState<any[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
        setInvData(user.invites || '')
        console.log(invData)
    }, [])

    useEffect(() => {
        const fetchExpensesData = async () => {
            if (email) {
                try {
                    const expenseData = await fetchExpenses(email)
                    if (Array.isArray(expenseData)) {
                        setExpenses(expenseData)
                    } else if (expenseData && expenseData.egresos) {
                        setExpenses(expenseData.egresos)
                    } else {
                        console.error(
                            'Unexpected response format:',
                            expenseData,
                        )
                    }
                } catch (error) {
                    console.error('Error fetching expenses:', error)
                }
            }
        }

        fetchExpensesData()
    }, [email])

    return (
        <div className="h-[65vh]">
            <Table>
                <THead>
                    <Th style={{ width: '12%' }}>Categoría</Th>
                    <Th style={{ width: '12%' }}>Subcategoría</Th>
                    <Th style={{ width: '15%' }}>Monto USD</Th>
                    <Th style={{ width: '15%' }}>Monto ARS</Th>
                    <Th style={{ width: '5%' }}>Cuotas</Th>
                    <Th style={{ width: '15%' }}>Monto Cuota</Th>
                    <Th style={{ width: '12%' }}>Próx. Pago</Th>
                    <Th>Comentarios</Th>
                </THead>
                <TBody>
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.categoria}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.subCategoria}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.divisa === 'USD'
                                    ? 'USD ' + format(expense.monto)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.divisa === 'ARS'
                                    ? 'ARS ' + format(expense.monto)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.cuotas}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.divisa === 'ARS'
                                    ? 'ARS ' +
                                      format(expense.monto / expense.cuotas)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {calculateNextPaymentDate(
                                    new Date(expense.fechaPago),
                                    expense.repetir,
                                ) === 'Acreditado'
                                    ? 'Acreditado'
                                    : formatDate(
                                          new Date(
                                              calculateNextPaymentDate(
                                                  new Date(expense.fechaPago),
                                                  expense.repetir,
                                              ),
                                          ),
                                      )}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {expense.comentarios}
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default ExpenseList
