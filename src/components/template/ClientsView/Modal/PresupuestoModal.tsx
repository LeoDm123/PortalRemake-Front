import React, { useState } from 'react'
import { Modal, IconButton } from '@mui/material'
import { HiOutlineDocumentText, HiOutlineXCircle } from 'react-icons/hi'
import { Card } from '@/components/ui'
import PresupuestoInfo from '../Info/PresupuestoInfo'
import PagosList from '../Lists/PagosList'
import { Presupuesto } from '@/@types/clientInfo'
import DividerMain from '../../DividerMain'

type PresupuestoModalProps = {
    presupuesto: Presupuesto
    clientId: string
    onDelete: () => void
}

const PresupuestoModal: React.FC<PresupuestoModalProps> = ({
    presupuesto,
    clientId,
    onDelete,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <IconButton size="small" onClick={toggleModal}>
                <HiOutlineDocumentText />
            </IconButton>

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
                        height: '100%',
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h4 id="modal-title" style={{ color: '#01662b' }}>
                                Detalles del Presupuesto
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

                    <PresupuestoInfo presupuesto={presupuesto} />

                    <PagosList
                        pagos={presupuesto.Pagos}
                        clientId={clientId}
                        presupuestoId={presupuesto._id}
                        onDelete={onDelete}
                    />
                </Card>
            </Modal>
        </>
    )
}

export default PresupuestoModal
