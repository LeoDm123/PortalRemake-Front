import React from 'react'
import { Card } from '@/components/ui'
import ClientsList from '../Lists/ClientsList'
import '../HomeView.css'

const ClientListCard = () => {
    return (
        <div>
            <Card className="clientCard">
                <ClientsList />
            </Card>
        </div>
    )
}

export default ClientListCard
