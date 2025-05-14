import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'
import MatAddModal from '../Modal/MatAddModal'

type AddMatButtonProps = {
    size: 'small' | 'medium' | 'large'
    onAddSuccess: () => void
}

const AddMatButton: React.FC<AddMatButtonProps> = ({ size, onAddSuccess }) => {
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
            <Tooltip title="Agregar material" arrow>
                <IconButton size={size} onClick={toggleModal}>
                    <HiOutlineDocumentPlus style={{ color: '#01662b' }} />
                </IconButton>
            </Tooltip>
            {isModalOpen && (
                <MatAddModal
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                    onAddSuccess={handleAddSuccess}
                />
            )}
        </>
    )
}

export default AddMatButton
