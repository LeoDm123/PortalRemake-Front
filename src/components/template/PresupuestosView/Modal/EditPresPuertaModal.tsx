import { Modal } from '@mui/material'
import { Card } from '@/components/ui'
import React from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi2'
import AddPresPuertaForm from '../Forms/AddPresPuertaForm'
import { Presupuesto } from '@/@types/presupuesto'

type EditPresPuertasModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onSubmitPres: () => void
    presupuestoToEdit: Presupuesto | null
}

const EditPresPuertasModal: React.FC<EditPresPuertasModalProps> = ({
    isOpen,
    toggleModal,
    onSubmitPres,
    presupuestoToEdit,
}) => {
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
                            Editar presupuesto de puertas de madera
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

                <AddPresPuertaForm 
                    onsubmit={onSubmitPres} 
                    presupuestoToEdit={presupuestoToEdit}
                    isEditing={true}
                />
            </Card>
        </Modal>
    )
}

export default EditPresPuertasModal
