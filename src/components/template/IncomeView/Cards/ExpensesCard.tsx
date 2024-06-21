import { Card } from '@/components/ui'
import React from 'react'
import ExpenseList from '../Lists/ExpenseList'

const ExpensesCard = () => {
    return (
        <div>
            <Card header="Egresos Propios">
                <ExpenseList />
            </Card>
        </div>
    )
}

export default ExpensesCard
