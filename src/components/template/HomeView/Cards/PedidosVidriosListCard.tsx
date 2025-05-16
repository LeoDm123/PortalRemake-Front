import React from 'react'
import { Card } from '@/components/ui'
import '../HomeView.css'
import PedidosVidriosActivosList from '../Lists/PedidosVidriosActivosList'

const PedidosVidriosListCard = () => {
    return (
        <div>
            <Card className="clientCard">
                <PedidosVidriosActivosList />
            </Card>
        </div>
    )
}

export default PedidosVidriosListCard
