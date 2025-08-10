import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineUserPlus } from 'react-icons/hi2'

type AddClientButtonProps = {
    isOpen: () => void
}

const AddClientButton: React.FC<AddClientButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <Tooltip title="Agregar cliente" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineUserPlus style={{ color: '#01662b' }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddClientButton
