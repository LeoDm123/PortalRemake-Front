import React from 'react'
import { Card } from '@/components/ui'
import ClientsList from '../Lists/ClientsList'

const ClientListCard = () => {
    return (
        <div>
            <Card>
                <ClientsList />
            </Card>
        </div>
    )
}

export default ClientListCard
