import { IconButton } from '@mui/material'
import { HiOutlineTrash } from 'react-icons/hi'
import React from 'react'

type DeleteButtonProps = {
    onDelete: () => void
    icon?: React.ReactNode
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, icon }) => {
    return (
        <IconButton size="small" onClick={onDelete}>
            <HiOutlineTrash />
        </IconButton>
    )
}

export default DeleteButton
