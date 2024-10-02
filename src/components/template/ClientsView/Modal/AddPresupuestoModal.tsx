import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import AddPresupuestoForm from '../Forms/AddPresupuestoForm'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import Swal from 'sweetalert2'
import '../clientViewStyles.css'

type AddPresupuestoModalProps = {
    isOpen: boolean
    toggleModal: () => void
    selectedClientIndex: string
    onSubmitPay: () => void
}

const AddPresupuestoModal: React.FC<AddPresupuestoModalProps> = ({
    isOpen,
    toggleModal,
    selectedClientIndex,
    onSubmitPay,
}) => {
    const submitRef = useRef<() => void>(() => {})

    const handleConfirmSubmit = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas asociar este presupuesto a este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, asociar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                submitRef.current()
            }
        })
    }

    const handleFormSubmit = () => {
        Swal.fire({
            title: 'Presupuesto asociado',
            text: 'El presupuesto ha sido asociado al cliente correctamente.',
            icon: 'success',
            confirmButtonColor: '#01662b',
        }).then(() => {
            toggleModal()
            onSubmitPay()
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
                            Asociar Presupuesto
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

                <AddPresupuestoForm
                    selectedClientIndex={selectedClientIndex}
                    onSubmitPay={handleFormSubmit}
                    submitRef={submitRef}
                />

                <Button
                    onClick={handleConfirmSubmit}
                    variant="solid"
                    style={{ backgroundColor: '#01662b', marginTop: '20px' }}
                >
                    Asociar Presupuesto
                </Button>
            </Card>
        </Modal>
    )
}

export default AddPresupuestoModal
