import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

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
                    <HiOutlineDocumentPlus />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddPresPuertasButton
