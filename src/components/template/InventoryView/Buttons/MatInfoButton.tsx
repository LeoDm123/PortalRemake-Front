import { IconButton } from '@mui/material'
import { HiOutlineClipboardList } from 'react-icons/hi'
import React from 'react'

type MatInfoButtonProps = {
    MatInfo: () => void
    size: 'small' | 'medium' | 'large'
}

const MatInfoButton: React.FC<MatInfoButtonProps> = ({ MatInfo, size }) => {
    return (
        <IconButton size={size} onClick={MatInfo}>
            <HiOutlineClipboardList />
        </IconButton>
    )
}

export default MatInfoButton
