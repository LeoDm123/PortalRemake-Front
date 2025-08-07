import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlinePlusCircle } from 'react-icons/hi2'

type AddPuertasButtonProps = {
    onClick: () => void
}

const AddPuertasButton: React.FC<AddPuertasButtonProps> = ({ onClick }) => {
    return (
        <div>
            <Tooltip title="Agregar Puerta" arrow>
                <IconButton onClick={onClick}>
                    <HiOutlinePlusCircle />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddPuertasButton
