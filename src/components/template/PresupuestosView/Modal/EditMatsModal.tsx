import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef } from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import AddPresPuertaForm from '../Forms/AddPresPuertaForm'
import EditMatsForm from '../Forms/EditMatsForm'
import { Material } from '@/@types/costos'

type EditMatsModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onSubmit: () => void
    material: Material
}

const EditMatsModal: React.FC<EditMatsModalProps> = ({
    isOpen,
    toggleModal,
    onSubmit,
    material,
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
                    width: '80%',
                    height: '65%',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 id="modal-title" style={{ color: '#01662b' }}>
                            Editar material
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
                <EditMatsForm material={material} onSave={onSubmit} />
            </Card>
        </Modal>
    )
}

export default EditMatsModal
