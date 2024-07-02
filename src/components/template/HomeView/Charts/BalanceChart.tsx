import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { fetchExpenses, fetchIncomes } from '@/api/api'
import formatNumber from '@/utils/hooks/formatNumber'
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

const BalanceChart: React.FC = () => {
    const [incomes, setIncomes] = useState<Income[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
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

    const calculateTotal = (
        items: (Income | Expense)[],
        type: 'Ingreso' | 'Gasto',
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

            return sum + amount
        }, 0)
    }

    const totalIncome = calculateTotal(incomes, 'Ingreso')
    const totalExpense = calculateTotal(expenses, 'Gasto')

    const data = [
        ['Task', 'Amount'],
        ['Ingresos', totalIncome],
        ['Gastos', totalExpense],
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
