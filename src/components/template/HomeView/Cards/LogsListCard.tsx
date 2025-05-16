import React from 'react'
import { Card } from '@/components/ui'
import '../HomeView.css'
import LogsList from '../Lists/LogsList'

const LogsListCard = () => {
    return (
        <div>
            <Card className="clientCard">
                <LogsList />
            </Card>
        </div>
    )
}

export default LogsListCard
