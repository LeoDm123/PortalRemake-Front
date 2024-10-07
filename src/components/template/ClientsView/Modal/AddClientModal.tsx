import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import Swal from 'sweetalert2'
import '../clientViewStyles.css'
import AddClientForm from '../Forms/AddClientForm'

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
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas agregar este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, agregar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                submitRef.current()
            }
        })
    }

    const handleFormSubmit = () => {
        Swal.fire({
            title: 'Cliente agregado',
            text: 'El cliente ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonColor: '#01662b',
        }).then(() => {
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
