import { Card } from '@/components/ui'
import React from 'react'
import IncomeList from '../Lists/IncomeList'

const IncomeCard = () => {
    return (
        <div>
            <Card header="Ingresos Propios">
                <IncomeList />
            </Card>
        </div>
    )
}

export default IncomeCard
