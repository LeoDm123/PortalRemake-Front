import { IconButton } from '@mui/material'
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
        <IconButton
            size={size}
            onClick={() => {
                onAddPedido()
            }}
        >
            <HiOutlineDocumentAdd />
        </IconButton>
    )
}

export default AddPedidoButton
