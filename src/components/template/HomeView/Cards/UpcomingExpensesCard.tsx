import React from 'react'
import UpcomingExpensesList from '../Lists/UpcomingExpensesList'
import { Card } from '@/components/ui'

const UpcomingExpensesCard = () => {
    return (
        <div>
            <Card>
                <UpcomingExpensesList />
            </Card>
        </div>
    )
}

export default UpcomingExpensesCard
