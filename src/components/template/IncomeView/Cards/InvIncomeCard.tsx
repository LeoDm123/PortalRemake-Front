import { Card } from '@/components/ui'
import React from 'react'
import InvitesList from '../../ProfileView/Lists/InvitesList'
import InvIncomeList from '../Lists/InvIncomeList'

const InvIncomeCard = () => {
    return (
        <div style={{ marginTop: 20 }}>
            <Card header="Ingresos de Invitados">
                <InvIncomeList />
            </Card>
        </div>
    )
}

export default InvIncomeCard
