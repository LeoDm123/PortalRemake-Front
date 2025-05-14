import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import InventarioLogModal from '../Modal/InventarioLogModal'

type ViewLogButtonProps = {
    size: 'small' | 'medium' | 'large'
    onAddSuccess: () => void
}

const ViewLogButton: React.FC<ViewLogButtonProps> = ({
    size,
    onAddSuccess,
}) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const handleAddSuccess = () => {
        onAddSuccess()
        setModalOpen(false)
    }

    return (
        <>
            <Tooltip title="Ver movimientos de inventario" arrow>
                <IconButton size={size} onClick={toggleModal}>
                    <HiOutlineClipboardDocumentList
                        style={{ color: '#01662b' }}
                    />
                </IconButton>
            </Tooltip>
            {isModalOpen && (
                <InventarioLogModal
                    onDelete={handleAddSuccess}
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                />
            )}
        </>
    )
}

export default ViewLogButton
