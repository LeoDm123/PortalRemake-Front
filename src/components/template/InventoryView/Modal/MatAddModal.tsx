import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import DividerMain from '@/components/template/DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import { Material } from '@/@types/mats'
import MatAddForm from '../Forms/MatAddForm'

type MatAddModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onAddSuccess: () => void
}

const MatAddModal: React.FC<MatAddModalProps> = ({
    isOpen,
    toggleModal,
    onAddSuccess,
}) => {
    const submitRef = useRef<() => void>(() => {})

    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{ zIndex: 1000 }}
        >
            <Card
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 id="modal-title" style={{ color: '#01662b' }}>
                            Información del material
                        </h4>
                        <DividerMain />
                    </div>

                    <IconButton
                        onClick={toggleModal}
                        style={{ color: '#01662b', padding: 0 }}
                        size="large"
                    >
                        <HiOutlineXCircle />
                    </IconButton>
                </div>
                <MatAddForm onAddSuccess={onAddSuccess} />
            </Card>
        </Modal>
    )
}

export default MatAddModal
