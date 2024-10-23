import DividerMain from '@/components/template/DividerMain'
import AddPedidoButton from '@/components/template/PedidosView/PerfilesView/Buttons/AddPedidoButton'
import PedidosPerfilesList from '@/components/template/PedidosView/PerfilesView/Lists/PedidosPerfilesList'
import React, { useState } from 'react'

const PerfilesView: React.FC = () => {
    const [isAddPedidoModalOpen, setIsAddPedidoModalOpen] = useState(false)

    const toggleAddPedidoModal = () => {
        setIsAddPedidoModalOpen(!isAddPedidoModalOpen)
    }

    return (
        <>
            <div>
                <div className="mb-2 flex justify-between items-center">
                    <h4 style={{ color: '#01662b' }}>Pedidos de Perfiles</h4>
                    <div className="flex">
                        <AddPedidoButton
                            onAddPedido={toggleAddPedidoModal}
                            size="medium"
                        />
                    </div>
                </div>
                <DividerMain />
                <PedidosPerfilesList />
            </div>
        </>
    )
}

export default PerfilesView
