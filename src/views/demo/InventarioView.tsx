import DividerMain from '@/components/template/DividerMain'
import MaterialesList from '@/components/template/InventoryView/Lists/MaterialesList'
import React, { useState } from 'react'

const InventarioView: React.FC = () => {
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
                    <h4 style={{ color: '#01662b' }}>Inventario</h4>
                    <div className="flex"></div>
                </div>
                <DividerMain />
                <MaterialesList />
            </div>
        </>
    )
}

export default InventarioView
