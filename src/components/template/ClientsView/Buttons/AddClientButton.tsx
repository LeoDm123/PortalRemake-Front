import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi'

type AddClientButtonProps = {
    isOpen: () => void
}

const AddClientButton: React.FC<AddClientButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <Tooltip title="Agregar cliente" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineUserAdd style={{ color: '#01662b' }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddClientButton
