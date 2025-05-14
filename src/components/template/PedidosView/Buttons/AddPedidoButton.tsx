import { IconButton, Tooltip } from '@mui/material'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import React from 'react'

type AddPedidoButtonProps = {
    onAddPedido: () => void
    size: 'small' | 'medium' | 'large'
}

const AddPedidoButton: React.FC<AddPedidoButtonProps> = ({
    onAddPedido,
    size,
}) => {
    return (
        <Tooltip title="Agregar pedido" arrow>
            <IconButton
                size={size}
                onClick={() => {
                    onAddPedido()
                }}
            >
                <HiOutlineDocumentAdd />
            </IconButton>
        </Tooltip>
    )
}

export default AddPedidoButton
