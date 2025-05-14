import { IconButton, Tooltip } from '@mui/material'
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
            <Tooltip title="Agregar presupuesto" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineDocumentAdd />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddPresupuestoButton
