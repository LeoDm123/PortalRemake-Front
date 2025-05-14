import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import AddLogModal from '../Modal/AddLogModal'

type AddLogButtonProps = {
    size: 'small' | 'medium' | 'large'
    onAddSuccess: () => void
}

const AddLogButton: React.FC<AddLogButtonProps> = ({ size, onAddSuccess }) => {
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
            <Tooltip title="Agregar movimiento de inventario" arrow>
                <IconButton size={size} onClick={toggleModal}>
                    <HiOutlineClipboardDocumentCheck
                        style={{ color: '#01662b' }}
                    />
                </IconButton>
            </Tooltip>
            {isModalOpen && (
                <AddLogModal
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                    onAddSuccess={handleAddSuccess}
                />
            )}
        </>
    )
}

export default AddLogButton
