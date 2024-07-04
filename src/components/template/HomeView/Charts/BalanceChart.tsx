import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { fetchExpenses, fetchIncomes, fetchBudgets } from '@/api/api'
import useDarkMode from '@/utils/hooks/useDarkmode'
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

interface Budget {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    porcentaje: number
    repetir: string
    fechaPago: Date
    comentarios: string
}

const BalanceChart: React.FC = () => {
    const [incomes, setIncomes] = useState<Income[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [budgets, setBudgets] = useState<Budget[]>([])
    const [timeFrame, setTimeFrame] = useState<string>('Mes')
    const [isDark] = useDarkMode()

    const timeFrameOptions = [
        { value: 'Mes', label: 'Mes' },
        { value: 'Semana', label: 'Semana' },
    ]

    useEffect(() => {
        const fetchUserData = async () => {
            const user: User = JSON.parse(localStorage.getItem('user') || '{}')
            const invData = user.invites || []

            const allIncomes: Income[] = []
            const allExpenses: Expense[] = []
            const allBudgets: Budget[] = []

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

            const applyBudgetLogic = (
                budget: Budget,
                totalIncomes: number,
            ): Budget => {
                if ('monto' in budget && 'porcentaje' in budget) {
                    if (budget.monto === 0 && budget.porcentaje > 0) {
                        budget.monto = (totalIncomes * budget.porcentaje) / 100
                    }
                }
                return budget
            }

            const fetchUserBudgets = async (
                userEmail: string,
                totalIncomes: number,
            ): Promise<Budget[]> => {
                try {
                    const budgetData = await fetchBudgets(userEmail)
                    const budgets = Array.isArray(budgetData)
                        ? budgetData
                        : budgetData.presupuestos || []

                    return budgets.map((budget: Budget) =>
                        applyBudgetLogic(budget, totalIncomes),
                    )
                } catch (error) {
                    console.error('Error fetching budgets:', error)
                    return []
                }
            }

            const fetchDataForUser = async (email: string) => {
                const userIncomes = await fetchUserIncomes(email)
                const userExpenses = await fetchUserExpenses(email)
                const totalIncomes = userIncomes.reduce(
                    (total, income) => total + income.monto,
                    0,
                )
                const userBudgets = await fetchUserBudgets(email, totalIncomes)
                return { userIncomes, userExpenses, userBudgets }
            }

            for (const invite of invData) {
                if (invite.email) {
                    const { userIncomes, userExpenses, userBudgets } =
                        await fetchDataForUser(invite.email)
                    allIncomes.push(...userIncomes)
                    allExpenses.push(...userExpenses)
                    allBudgets.push(...userBudgets)
                }
            }

            const { userIncomes, userExpenses, userBudgets } =
                await fetchDataForUser(user.email)
            allIncomes.push(...userIncomes)
            allExpenses.push(...userExpenses)
            allBudgets.push(...userBudgets)

            setIncomes(allIncomes)
            setExpenses(allExpenses)
            setBudgets(allBudgets)
        }

        fetchUserData()
    }, [])

    const calculateTotal = (
        items: (Income | Expense | Budget)[],
        type: 'Ingreso' | 'Gasto' | 'Presupuesto',
    ) => {
        return items.reduce((sum, item) => {
            let amount = item.monto
            if (timeFrame === 'Mes') {
                if (item.repetir === 'Semanalmente') {
                    amount *= 4
                }
            } else if (timeFrame === 'Semana') {
                if (item.repetir === 'Mensualmente') {
                    amount /= 4
                }
            }

            if (type === 'Gasto' && 'cuotas' in item) {
                if (item.repetir === 'Semanalmente' && timeFrame === 'Mes') {
                    amount = (item.monto / item.cuotas) * 4
                } else if (
                    item.repetir === 'Mensualmente' &&
                    timeFrame === 'Semana'
                ) {
                    amount = item.monto / item.cuotas / 4
                } else {
                    amount = item.monto / item.cuotas
                }
            }

            if (type === 'Presupuesto') {
                if (item.repetir === 'Semanalmente' && timeFrame === 'Mes') {
                    amount = item.monto * 4
                } else if (
                    item.repetir === 'Mensualmente' &&
                    timeFrame === 'Semana'
                ) {
                    amount = item.monto / 4
                } else {
                    amount = item.monto
                }
            }

            return sum + amount
        }, 0)
    }

    const totalIncome = calculateTotal(incomes, 'Ingreso')
    const totalExpense = calculateTotal(expenses, 'Gasto')
    const totalBudget = calculateTotal(budgets, 'Presupuesto')

    const data = [
        ['Task', 'Amount'],
        ['Ingresos', totalIncome],
        ['Gastos', totalExpense],
        ['Presupuestos', totalBudget],
    ]

    const options = {
        titleTextStyle: isDark
            ? { fontSize: 20, bold: true, italic: false, color: '#ffffff' }
            : { fontSize: 20, bold: true, italic: false },
        chartArea: { top: 40, left: 20, width: '100%', height: '100%' },
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        legend: {
            textStyle: { color: isDark ? '#ffffff' : '#000000' },
        },
        slices: {
            0: { color: isDark ? '#5DADE2' : '#2874A6' },
            1: { color: isDark ? '#EC7063' : '#E74C3C' },
        },
    }

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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                }}
            >
                <h5 style={{ marginBottom: 5 }}>
                    Balance de Ingresos y Gastos
                </h5>
                <Select
                    options={timeFrameOptions}
                    onChange={handleTimeFrameChange}
                    defaultValue={timeFrameOptions.find(
                        (option) => option.value === 'Mes',
                    )}
                    size="sm"
                />
            </div>
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
