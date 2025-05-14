import DividerMain from '@/components/template/DividerMain'
import AddLogButton from '@/components/template/InventoryView/Buttons/AddLogButton'
import AddMatButton from '@/components/template/InventoryView/Buttons/AddMatButton'
import AddMatListButton from '@/components/template/InventoryView/Buttons/AddMatListButton'
import ViewLogButton from '@/components/template/InventoryView/Buttons/ViewLogButton'
import MaterialesList from '@/components/template/InventoryView/Lists/MaterialesList'
import React, { useState } from 'react'
import { Input } from '@/components/ui'

const InventarioView: React.FC = () => {
    const [isAddPedidoModalOpen, setIsAddPedidoModalOpen] = useState(false)
    const [onPedidoSubmit, setOnPedidoSubmit] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const toggleAddPedidoModal = () => {
        setIsAddPedidoModalOpen(!isAddPedidoModalOpen)
    }

    const handleOnSubmit = () => {
        setOnPedidoSubmit(!onPedidoSubmit)
    }

    return (
        <>
            <div>
                <div>
                    <div className="mb-1 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h4 style={{ color: '#01662b' }}>Inventario</h4>
                        </div>
                        <Input
                            size="sm"
                            type="text"
                            placeholder="Buscar materiales..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-96"
                        />
                        <div className="flex">
                            <AddMatButton
                                size="medium"
                                onAddSuccess={handleOnSubmit}
                            />
                            <AddMatListButton
                                size="medium"
                                onAddSuccess={handleOnSubmit}
                            />
                            <ViewLogButton
                                size="medium"
                                onAddSuccess={handleOnSubmit}
                            />
                            <AddLogButton
                                size="medium"
                                onAddSuccess={handleOnSubmit}
                            />
                        </div>
                    </div>
                    <DividerMain />
                    <MaterialesList
                        searchTerm={searchTerm}
                        onPedidoSubmit={handleOnSubmit}
                    />
                </div>
            </div>
        </>
    )
}

export default InventarioView
