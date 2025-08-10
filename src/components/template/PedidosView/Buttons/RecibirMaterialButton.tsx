import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineInboxArrowDown } from 'react-icons/hi2'

type RecibirMaterialProps = {
    recibirMat: () => void
    size: 'small' | 'medium' | 'large'
}

const RecibirMaterialButton: React.FC<RecibirMaterialProps> = ({
    recibirMat,
    size,
}) => {
    return (
        <Tooltip title="Registrar recepción" arrow>
            <IconButton size={size} onClick={recibirMat}>
                <HiOutlineInboxArrowDown />
            </IconButton>
        </Tooltip>
    )
}

export default RecibirMaterialButton
