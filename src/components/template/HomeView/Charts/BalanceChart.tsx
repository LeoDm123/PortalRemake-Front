import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { fetchExpenses, fetchIncomes } from '@/api/api'
import formatNumber from '@/utils/hooks/formatNumber'

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

interface Income {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    fechaPago: Date
    comentarios: string
}

const BalanceChart: React.FC = () => {
    const [incomes, setIncomes] = useState<Income[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
    const format = formatNumber()

    useEffect(() => {
        const fetchUserData = async () => {
            const user: User = JSON.parse(localStorage.getItem('user') || '{}')
            const invData = user.invites || []

            const allIncomes: Income[] = []
            const allExpenses: Expense[] = []

            const fetchUserIncomes = async (
                userEmail: string,
            ): Promise<Income[]> => {
                try {
                    const incomesData = await fetchIncomes(userEmail)
                    return Array.isArray(incomesData)
                        ? incomesData
                        : incomesData.ingresos || []
                } catch (error) {
                    console.error('Error fetching incomes:', error)
                    return []
                }
            }

            const fetchUserExpenses = async (
                userEmail: string,
            ): Promise<Expense[]> => {
                try {
                    const expenseData = await fetchExpenses(userEmail)
                    return Array.isArray(expenseData)
                        ? expenseData
                        : expenseData.egresos || []
                } catch (error) {
                    console.error('Error fetching expenses:', error)
                    return []
                }
            }

            for (const invite of invData) {
                if (invite.email) {
                    const inviteIncomes = await fetchUserIncomes(invite.email)
                    const inviteExpenses = await fetchUserExpenses(invite.email)
                    allIncomes.push(...inviteIncomes)
                    allExpenses.push(...inviteExpenses)
                }
            }

            const userIncomes = await fetchUserIncomes(user.email)
            const userExpenses = await fetchUserExpenses(user.email)
            allIncomes.push(...userIncomes)
            allExpenses.push(...userExpenses)

            setIncomes(allIncomes)
            setExpenses(allExpenses)
        }

        fetchUserData()
    }, [])

    const totalIncome = incomes.reduce((sum, income) => sum + income.monto, 0)
    const totalExpense = expenses.reduce(
        (sum, expense) => sum + expense.monto / expense.cuotas,
        0,
    )

    const data = [
        ['Task', 'Amount'],
        ['Ingresos', totalIncome],
        ['Gastos', totalExpense],
    ]

    const options = {
        title: 'Balance de Ingresos y Gastos',
        titleTextStyle: { fontSize: 20, bold: true, italic: false },
        chartArea: { top: 40, left: 20, width: '100%', height: '100%' },
    }

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={'100%'}
                height={'400px'}
            />
        </div>
    )
}

export default BalanceChart
