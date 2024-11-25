import { Modal } from '@mui/material'
import { Card } from '@/components/ui'
import React, { useRef } from 'react'
import DividerMain from '@/components/template/DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import { Material } from '@/@types/pedidos'
import RecibirMaterialForm from '../Forms/RecibirMaterialForm'

type RecibirMaterialModalProps = {
    isOpen: boolean
    toggleModal: () => void
    material: Material
    pedidoId: string
    onReceptionComplete: () => void
}

const RecibirMaterialModal: React.FC<RecibirMaterialModalProps> = ({
    isOpen,
    toggleModal,
    material,
    pedidoId,
    onReceptionComplete,
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
                    width: '50%',
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

                <RecibirMaterialForm
                    material={material}
                    pedidoId={pedidoId}
                    onSubmit={onReceptionComplete}
                    closeModal={toggleModal}
                />
            </Card>
        </Modal>
    )
}

export default RecibirMaterialModal
