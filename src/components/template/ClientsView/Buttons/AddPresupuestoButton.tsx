import { IconButton } from '@mui/material'
import React from 'react'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

type AddPresupuestoButtonProps = {
    isOpen: () => void
}

const AddPresupuestoButton: React.FC<AddPresupuestoButtonProps> = ({
    isOpen,
}) => {
    return (
        <div>
            <IconButton onClick={isOpen}>
                <HiOutlineDocumentAdd />
            </IconButton>
        </div>
    )
}

export default AddPresupuestoButton
