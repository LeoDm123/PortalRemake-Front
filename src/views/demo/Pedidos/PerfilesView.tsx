import React, { useState } from 'react'
import DividerMain from '@/components/template/DividerMain'
import AddPedidoButton from '@/components/template/PedidosView/Buttons/AddPedidoButton'
import PedidosPerfilesList from '@/components/template/PedidosView/PerfilesView/Lists/PedidosPerfilesList'
import AddPedidoModal from '@/components/template/PedidosView/PerfilesView/Modal/AddPedidoModal'
import ShowPedidoSwitcher from '@/components/template/PedidosView/Buttons/ShowPedidoSwitcher'

const PerfilesView: React.FC = () => {
    const [isAddPedidoModalOpen, setIsAddPedidoModalOpen] = useState(false)
    const [onPedidoSubmit, setOnPedidoSubmit] = useState(false)
    const [allPedidos, setAllPedidos] = useState(false)

    const toggleAddPedidoModal = () => {
        setIsAddPedidoModalOpen((prev) => !prev)
    }

    const handleOnSubmit = () => {
        setOnPedidoSubmit(!onPedidoSubmit)
    }

    return (
        <>
            <div>
                <div className="mb-1 flex justify-between items-center">
                    <h4 style={{ color: '#01662b' }}>Pedidos de Perfiles</h4>
                    <div className="flex">
                        <div className="flex mr-5 items-center">
                            <p className="mr-2">Mostrar todos </p>
                            <ShowPedidoSwitcher
                                allPedidos={allPedidos}
                                setAllPedidos={setAllPedidos}
                            />
                        </div>
                        <AddPedidoButton
                            onAddPedido={toggleAddPedidoModal}
                            size="medium"
                        />
                    </div>
                </div>
                <DividerMain />
                <PedidosPerfilesList
                    onSubmit={handleOnSubmit}
                    allPedidos={allPedidos}
                />
            </div>

            <AddPedidoModal
                isOpen={isAddPedidoModalOpen}
                toggleModal={toggleAddPedidoModal}
                onSubmit={handleOnSubmit}
            />
        </>
    )
}

export default PerfilesView
