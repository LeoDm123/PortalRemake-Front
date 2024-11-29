import { IconButton } from '@mui/material'
import { HiOutlineLogin } from 'react-icons/hi'
import React from 'react'

type RecibirMaterialProps = {
    recibirMat: () => void
    size: 'small' | 'medium' | 'large'
}

const RecibirMaterialButton: React.FC<RecibirMaterialProps> = ({
    recibirMat,
    size,
}) => {
    return (
        <IconButton size={size} onClick={recibirMat}>
            <HiOutlineLogin />
        </IconButton>
    )
}

export default RecibirMaterialButton
