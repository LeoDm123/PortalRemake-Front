import React, { useEffect, useState } from 'react'
import { fetchExpenses, fetchIncomes, fetchBudgets } from '@/api/api'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import Tr from '@/components/ui/Table/Tr'

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

const MonthCalendar = () => {
    const [incomes, setIncomes] = useState<Income[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [budgets, setBudgets] = useState<Budget[]>([])
    const [timeFrame, setTimeFrame] = useState<string>('Mes')

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
                        ? incomesData.map((income) => ({
                              ...income,
                              fechaPago: new Date(income.fechaPago),
                          }))
                        : incomesData.ingresos.map((income) => ({
                              ...income,
                              fechaPago: new Date(income.fechaPago),
                          }))
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
                        ? expenseData.map((expense) => ({
                              ...expense,
                              fechaPago: new Date(expense.fechaPago),
                          }))
                        : expenseData.egresos.map((expense) => ({
                              ...expense,
                              fechaPago: new Date(expense.fechaPago),
                          }))
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

                    return budgets.map((budget: Budget) => ({
                        ...applyBudgetLogic(budget, totalIncomes),
                        fechaPago: new Date(budget.fechaPago),
                    }))
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

    const groupByDate = (items: (Income | Expense | Budget)[]) => {
        return items.reduce(
            (acc, item) => {
                const dateKey = item.fechaPago.toISOString().split('T')[0]
                if (!acc[dateKey]) {
                    acc[dateKey] = []
                }
                acc[dateKey].push(item)
                return acc
            },
            {} as { [key: string]: (Income | Expense | Budget)[] },
        )
    }

    const groupedData = groupByDate([...incomes, ...expenses, ...budgets])

    return <div></div>
}

export default MonthCalendar
