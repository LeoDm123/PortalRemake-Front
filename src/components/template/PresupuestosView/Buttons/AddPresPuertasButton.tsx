import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

type AddPresPuertasButtonProps = {
    isOpen: () => void
}

const AddPresPuertasButton: React.FC<AddPresPuertasButtonProps> = ({
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

export default AddPresPuertasButton
