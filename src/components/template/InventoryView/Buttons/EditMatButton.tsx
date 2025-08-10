import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import MatEditModal from '../Modal/MatEditModal'
import { Material } from '@/@types/mats'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

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
            <Tooltip title="Editar material" arrow>
                <IconButton size={size} onClick={toggleModal}>
                    <HiOutlinePencilSquare />
                </IconButton>
            </Tooltip>
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
