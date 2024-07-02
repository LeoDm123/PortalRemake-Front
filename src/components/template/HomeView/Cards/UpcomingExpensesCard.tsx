import React from 'react'
import UpcomingExpensesList from '../Lists/UpcomingExpensesList'
import { Card } from '@/components/ui'

const UpcomingExpensesCard = () => {
    return (
        <div>
            <Card className="h-[80vh]">
                <UpcomingExpensesList />
            </Card>
        </div>
    )
}

export default UpcomingExpensesCard
