import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlineCog8Tooth } from 'react-icons/hi2'

type SettingsButtonProps = {
    isOpen: () => void
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <Tooltip title="Abrir costos" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineCog8Tooth />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default SettingsButton
