import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import '../clientViewStyles.css'
import AddClientForm from '../Forms/AddClientForm'
import { showConfirmation, showSuccess } from '@/utils/hooks/alerts'

type AddClientModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onSubmitClient: () => void
}

const AddClientModal: React.FC<AddClientModalProps> = ({
    isOpen,
    toggleModal,
    onSubmitClient,
}) => {
    const submitRef = useRef<() => void>(() => {})

    const handleConfirmSubmit = () => {
        showConfirmation(
            '¿Estás seguro?',
            '¿Deseas agregar este cliente?',
        ).then((result) => {
            if (result.isConfirmed) {
                submitRef.current()
            }
        })
    }

    const handleFormSubmit = () => {
        showSuccess(
            'Cliente agregado',
            'El cliente ha sido agregado correctamente.',
        ).then(() => {
            toggleModal()
            onSubmitClient()
        })
    }

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
                    width: '80%',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 id="modal-title" style={{ color: '#01662b' }}>
                            Agregar Cliente
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

                <AddClientForm
                    onSubmitClient={handleFormSubmit}
                    submitRef={submitRef}
                />

                <Button
                    onClick={handleConfirmSubmit}
                    variant="solid"
                    style={{ backgroundColor: '#01662b', marginTop: '20px' }}
                >
                    Agregar Cliente
                </Button>
            </Card>
        </Modal>
    )
}

export default AddClientModal
