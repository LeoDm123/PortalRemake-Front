import React, { useState, useEffect } from 'react'
import ExpenseList from '../Lists/ExpenseList'
import Pagination from '@/components/ui/Pagination'
import { fetchExpenses } from '@/api/api'

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
    dividir: boolean
    condDiv: string
    montoDiv: number
}

const ExpensePages: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const pageSize = 5

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
    }, [])

    useEffect(() => {
        const fetchExpensesData = async () => {
            try {
                const expenseData = await fetchExpenses(email)
                setExpenses(expenseData.egresos)
            } catch (error) {
                console.error('Error fetching expenses:', error)
            }
        }

        fetchExpensesData()
    }, [email])

    const totalItems = expenses.length

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <ExpenseList
                currentPage={currentPage}
                pageSize={pageSize}
                expenses={expenses}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default ExpensePages
