import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import AddPagoForm from '../Forms/AddPagoForm'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import '../clientViewStyles.css'
import { showConfirmation, showSuccess } from '@/utils/hooks/alerts'

type AddPagoModalProps = {
    isOpen: boolean
    toggleModal: () => void
    selectedClientIndex: string
    onSubmitPay: () => void
}

const AddPagoModal: React.FC<AddPagoModalProps> = ({
    isOpen,
    toggleModal,
    selectedClientIndex,
    onSubmitPay,
}) => {
    const submitRef = useRef<() => void>(() => {})

    const handleConfirmSubmit = () => {
        showConfirmation('¿Estás seguro?', '¿Deseas agregar este pago?').then(
            (result) => {
                if (result.isConfirmed) {
                    submitRef.current()
                }
            },
        )
    }

    const handleFormSubmit = () => {
        showSuccess(
            'Pago agregado',
            'El pago ha sido agregado correctamente.',
        ).then(() => {
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
                            Agregar Pago
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

                <AddPagoForm
                    selectedClientIndex={selectedClientIndex}
                    onSubmitPay={handleFormSubmit}
                    submitRef={submitRef}
                />

                <Button
                    onClick={handleConfirmSubmit}
                    variant="solid"
                    style={{ backgroundColor: '#01662b', marginTop: '20px' }}
                >
                    Agregar Pago
                </Button>
            </Card>
        </Modal>
    )
}

export default AddPagoModal
