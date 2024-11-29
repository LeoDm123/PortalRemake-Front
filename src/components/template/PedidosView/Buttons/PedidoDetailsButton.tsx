import { IconButton } from '@mui/material'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import React from 'react'

type PedidoDetailsProps = {
    pedidoInfo: () => void
    size: 'small' | 'medium' | 'large'
}

const PedidoDetailsButton: React.FC<PedidoDetailsProps> = ({
    pedidoInfo,
    size,
}) => {
    return (
        <IconButton size={size} onClick={pedidoInfo}>
            <HiOutlineInformationCircle />
        </IconButton>
    )
}

export default PedidoDetailsButton
