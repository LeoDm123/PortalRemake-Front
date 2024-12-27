import DividerMain from '@/components/template/DividerMain'
import AddPedidoButton from '@/components/template/PedidosView/Buttons/AddPedidoButton'
import PedidosVidriosList from '@/components/template/PedidosView/VidriosView/Lists/PedidosVidriosList'
import AddPedidoModal from '@/components/template/PedidosView/VidriosView/Modal/AddPedidoModal'
import React, { useState } from 'react'

const VidriosView: React.FC = () => {
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
                    <h4 style={{ color: '#01662b' }}>Pedidos de Vidrios</h4>
                    <div className="flex">
                        <AddPedidoButton
                            onAddPedido={toggleAddPedidoModal}
                            size="medium"
                        />
                    </div>
                </div>
                <DividerMain />
                <PedidosVidriosList onSubmit={handleOnSubmit} />
            </div>

            <AddPedidoModal
                isOpen={isAddPedidoModalOpen}
                toggleModal={toggleAddPedidoModal}
                onSubmit={handleOnSubmit}
            />
        </>
    )
}

export default VidriosView
