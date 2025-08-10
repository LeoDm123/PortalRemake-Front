import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import MatInfoModal from '../Modal/MatInfoModal'
import { Material } from '@/@types/mats'
import { HiOutlineListBullet } from 'react-icons/hi2'

type MatInfoButtonProps = {
    material: Material
    size: 'small' | 'medium' | 'large'
}

const MatInfoButton: React.FC<MatInfoButtonProps> = ({ material, size }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    return (
        <>
            <Tooltip title="Ver información del material" arrow>
                <IconButton size={size} onClick={toggleModal}>
                    <HiOutlineListBullet />
                </IconButton>
            </Tooltip>
            {isModalOpen && (
                <MatInfoModal
                    material={material}
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                />
            )}
        </>
    )
}

export default MatInfoButton
