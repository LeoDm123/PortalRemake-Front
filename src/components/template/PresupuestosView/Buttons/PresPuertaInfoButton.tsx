import { IconButton } from '@mui/material'
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2'
import React, { useState } from 'react'
import PresPuertaInfoModal from '../Modal/PresPuertaInfoModal'
import { Presupuesto } from '@/@types/presupuesto'

type PresPuertaInfoButtonProps = {
    presupuesto: Presupuesto
    size: 'small' | 'medium' | 'large'
}

const PresPuertaInfoButton: React.FC<PresPuertaInfoButtonProps> = ({
    presupuesto,
    size,
}) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    return (
        <>
            <IconButton size={size} onClick={toggleModal}>
                <HiOutlineDocumentMagnifyingGlass />
            </IconButton>
            {isModalOpen && (
                <PresPuertaInfoModal
                    presupuesto={presupuesto}
                    toggleModal={toggleModal}
                    isOpen={isModalOpen}
                />
            )}
        </>
    )
}

export default PresPuertaInfoButton
