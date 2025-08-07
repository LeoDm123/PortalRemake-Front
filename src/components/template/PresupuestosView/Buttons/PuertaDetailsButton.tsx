import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineCog8Tooth } from 'react-icons/hi2'

type PuertaDetailsButtonProps = {
    isOpen: () => void
}

const PuertaDetailsButton: React.FC<PuertaDetailsButtonProps> = ({
    isOpen,
}) => {
    return (
        <div>
            <Tooltip title="Ver detalles" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineCog8Tooth />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default PuertaDetailsButton
