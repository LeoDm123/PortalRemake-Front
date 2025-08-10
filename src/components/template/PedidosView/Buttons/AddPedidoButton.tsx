import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

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
                <HiOutlineDocumentPlus />
            </IconButton>
        </Tooltip>
    )
}

export default AddPedidoButton
