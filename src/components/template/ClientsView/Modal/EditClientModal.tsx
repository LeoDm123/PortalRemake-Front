import { Modal } from '@mui/material'
import { Card, Button } from '@/components/ui'
import React, { useRef, useState, useEffect } from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import '../clientViewStyles.css'
import EditClientForm from '../Forms/EditClientForm'
import { fetchClientById } from '@/api/api'
import { showConfirmation, showError, showSuccess } from '@/utils/hooks/alerts'

type EditClientModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onEditClient: () => void
    clientId: string
}

const EditClientModal: React.FC<EditClientModalProps> = ({
    isOpen,
    toggleModal,
    onEditClient,
    clientId,
}) => {
    const submitRef = useRef<() => void>(() => {})
    const [clientData, setClientData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchClientData = async () => {
            if (clientId && isOpen) {
                setLoading(true)
                try {
                    const data = await fetchClientById(clientId)
                    setClientData(data)
                } catch (error) {
                    console.error('Error al obtener el cliente:', error)
                    showError(
                        'Error',
                        'No se pudo cargar la información del cliente.',
                    )
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchClientData()
    }, [clientId, isOpen])

    const handleConfirmSubmit = () => {
        showConfirmation(
            '¿Estás seguro?',
            '¿Deseas editar la información del cliente?',
        ).then((result) => {
            if (result.isConfirmed) {
                submitRef.current()
            }
        })
    }

    const handleFormSubmit = () => {
        showSuccess(
            'Cliente editado',
            'La información del cliente ha sido editada correctamente.',
        ).then(() => {
            toggleModal()
            onEditClient()
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
                            Editar Cliente
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

                {loading ? (
                    <p>Cargando datos del cliente...</p>
                ) : clientData ? (
                    <EditClientForm
                        onSubmitClient={handleFormSubmit}
                        submitRef={submitRef}
                        clientData={clientData}
                        clientId={clientId}
                    />
                ) : (
                    <p>Error al cargar los datos del cliente.</p>
                )}

                {!loading && (
                    <Button
                        onClick={handleConfirmSubmit}
                        variant="solid"
                        style={{
                            backgroundColor: '#01662b',
                        }}
                    >
                        Editar Cliente
                    </Button>
                )}
            </Card>
        </Modal>
    )
}

export default EditClientModal
