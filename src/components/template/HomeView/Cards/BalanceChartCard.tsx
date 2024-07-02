import React from 'react'
import BalanceChart from '../Charts/BalanceChart'
import { Card } from '@/components/ui'

const BalanceChartCard = () => {
    return (
        <div>
            <Card>
                <BalanceChart />
            </Card>
        </div>
    )
}

export default BalanceChartCard
