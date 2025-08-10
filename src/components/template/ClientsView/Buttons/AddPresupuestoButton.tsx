import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

type AddPresupuestoButtonProps = {
    isOpen: () => void
}

const AddPresupuestoButton: React.FC<AddPresupuestoButtonProps> = ({
    isOpen,
}) => {
    return (
        <div>
            <Tooltip title="Agregar presupuesto" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineDocumentPlus />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddPresupuestoButton
