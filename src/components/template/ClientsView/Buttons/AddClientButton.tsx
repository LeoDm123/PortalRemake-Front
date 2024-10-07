import { IconButton } from '@mui/material'
import React from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi'

type AddClientButtonProps = {
    isOpen: () => void
}

const AddClientButton: React.FC<AddClientButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <IconButton onClick={isOpen}>
                <HiOutlineUserAdd style={{ color: '#01662b' }} />
            </IconButton>
        </div>
    )
}

export default AddClientButton
