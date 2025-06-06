import { IconButton } from '@mui/material'
import { HiOutlineClipboardList } from 'react-icons/hi'
import React, { useState } from 'react'
import MatInfoModal from '../Modal/MatInfoModal'
import { Material } from '@/@types/mats'

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
            <IconButton size={size} onClick={toggleModal}>
                <HiOutlineClipboardList />
            </IconButton>
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
