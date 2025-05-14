import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { HiOutlineFolderPlus } from 'react-icons/hi2'
import AddMatListModal from '../Modal/AddMatListModal'

type AddMatListButtonProps = {
    size: 'small' | 'medium' | 'large'
    onAddSuccess: () => void
}

const AddMatListButton: React.FC<AddMatListButtonProps> = ({
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
            <Tooltip title="Agregar lista de materiales" arrow>
                <IconButton size={size} onClick={toggleModal}>
                    <HiOutlineFolderPlus style={{ color: '#01662b' }} />
                </IconButton>
            </Tooltip>
            {isModalOpen && (
                <AddMatListModal
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                    onSubmit={handleAddSuccess}
                />
            )}
        </>
    )
}

export default AddMatListButton
