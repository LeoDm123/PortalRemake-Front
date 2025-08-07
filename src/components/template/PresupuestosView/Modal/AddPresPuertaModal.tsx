import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import AddPresPuertaForm from '../Forms/AddPresPuertaForm'

type AddPresPuertasModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onSubmitPres: () => void
}

const AddPresPuertasModal: React.FC<AddPresPuertasModalProps> = ({
    isOpen,
    toggleModal,
    onSubmitPres,
}) => {
    const submitRef = useRef<() => void>(() => {})

    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{ zIndex: 30 }}
        >
            <Card
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 id="modal-title" style={{ color: '#01662b' }}>
                            Crear presupuesto de puertas de madera
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

                <AddPresPuertaForm onsubmit={onSubmitPres} />
            </Card>
        </Modal>
    )
}

export default AddPresPuertasModal
