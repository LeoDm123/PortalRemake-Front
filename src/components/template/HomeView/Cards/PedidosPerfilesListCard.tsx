import React from 'react'
import { Card } from '@/components/ui'
import '../HomeView.css'
import PedidosPerfilesActivosList from '../Lists/PedidosPerfilesActivosList'

const PedidosPerfilesListCard = () => {
    return (
        <div>
            <Card className="clientCard">
                <PedidosPerfilesActivosList />
            </Card>
        </div>
    )
}

export default PedidosPerfilesListCard
