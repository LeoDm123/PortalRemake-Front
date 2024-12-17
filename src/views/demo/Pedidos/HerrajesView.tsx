import DividerMain from '@/components/template/DividerMain'
import AddPedidoButton from '@/components/template/PedidosView/Buttons/AddPedidoButton'
import PedidosHerrajesList from '@/components/template/PedidosView/HerrajesView/Lists/PedidosHerrajesList'
import AddPedidoModal from '@/components/template/PedidosView/HerrajesView/Modal/AddPedidoModal'
import React, { useState } from 'react'

const HerrajesView: React.FC = () => {
    const [isAddPedidoModalOpen, setIsAddPedidoModalOpen] = useState(false)
    const [onPedidoSubmit, setOnPedidoSubmit] = useState(false)

    const toggleAddPedidoModal = () => {
        setIsAddPedidoModalOpen(!isAddPedidoModalOpen)
    }

    const handleOnSubmit = () => {
        setOnPedidoSubmit(!onPedidoSubmit)
    }

    return (
        <>
            <div>
                <div className="mb-1 flex justify-between items-center">
                    <h4 style={{ color: '#01662b' }}>Pedidos de Herrajes</h4>
                    <div className="flex">
                        <AddPedidoButton
                            onAddPedido={toggleAddPedidoModal}
                            size="medium"
                        />
                    </div>
                </div>
                <DividerMain />
                <PedidosHerrajesList onSubmit={handleOnSubmit} />
            </div>

            <AddPedidoModal
                isOpen={isAddPedidoModalOpen}
                toggleModal={toggleAddPedidoModal}
                onSubmit={handleOnSubmit}
            />
        </>
    )
}

export default HerrajesView
