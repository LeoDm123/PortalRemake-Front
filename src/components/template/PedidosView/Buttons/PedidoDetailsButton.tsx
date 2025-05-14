import { IconButton, Tooltip } from '@mui/material'
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
        <Tooltip title="Ver información" arrow>
            <IconButton size={size} onClick={pedidoInfo}>
                <HiOutlineInformationCircle />
            </IconButton>
        </Tooltip>
    )
}

export default PedidoDetailsButton
