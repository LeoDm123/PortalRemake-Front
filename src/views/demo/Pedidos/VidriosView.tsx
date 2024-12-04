import DividerMain from '@/components/template/DividerMain'
import AddPedidoButton from '@/components/template/PedidosView/Buttons/AddPedidoButton'
import PedidosVidriosList from '@/components/template/PedidosView/VidriosView/Lists/PedidosVidriosList'
import React, { useState } from 'react'

const VidriosView: React.FC = () => {
    const [isAddPedidoModalOpen, setIsAddPedidoModalOpen] = useState(false)

    const toggleAddPedidoModal = () => {
        setIsAddPedidoModalOpen(!isAddPedidoModalOpen)
    }

    return (
        <>
            <div>
                <div className="mb-2 flex justify-between items-center">
                    <h4 style={{ color: '#01662b' }}>Pedidos de Vidrios</h4>
                    <div className="flex">
                        <AddPedidoButton
                            onAddPedido={toggleAddPedidoModal}
                            size="medium"
                        />
                    </div>
                </div>
                <DividerMain />
                <PedidosVidriosList />
            </div>
        </>
    )
}

export default VidriosView
