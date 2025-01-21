import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import MatEditModal from '../Modal/MatEditModal'
import { Material } from '@/@types/mats'

type EditMatButtonProps = {
    material: Material
    size: 'small' | 'medium' | 'large'
    onEditSuccess: () => void
}

const EditMatButton: React.FC<EditMatButtonProps> = ({
    material,
    size,
    onEditSuccess,
}) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const handleEditSuccess = () => {
        onEditSuccess()
        setModalOpen(false)
    }

    return (
        <>
            <IconButton size={size} onClick={toggleModal}>
                <HiOutlinePencilAlt />
            </IconButton>
            {isModalOpen && (
                <MatEditModal
                    material={material}
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                    onEditSuccess={handleEditSuccess}
                />
            )}
        </>
    )
}

export default EditMatButton
