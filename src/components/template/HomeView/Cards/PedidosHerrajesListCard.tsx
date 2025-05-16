import React from 'react'
import { Card } from '@/components/ui'
import '../HomeView.css'
import PedidosHerrajesActivosList from '../Lists/PedidosHerrajesActivosList'

const PedidosHerrajesListCard = () => {
    return (
        <div>
            <Card className="clientCard">
                <PedidosHerrajesActivosList />
            </Card>
        </div>
    )
}

export default PedidosHerrajesListCard
