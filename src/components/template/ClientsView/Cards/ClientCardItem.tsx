import React, { useState } from 'react'
import { Card } from '@/components/ui'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import { IconButton } from '@mui/material'
import formatCurrency from '@/utils/hooks/formatCurrency'
import PresupuestosCardList from '../Lists/PresupuestosCardList'
import { Client } from '@/@types/clientInfo'
import ClientDetailsDropdown from '../Dropdown/ClientDropdown'
import AddPresupuestoButton from '../Buttons/AddPresupuestoButton'
import AddPagoButton from '../Buttons/AddPagoButton'
import AddPagoModal from '../Modal/AddPagoModal'
import AddPresupuestoModal from '../Modal/AddPresupuestoModal'
import DeleteButton from '../../DeleteButton'
import { deleteClient } from '@/api/api'
import Swal from 'sweetalert2'

type Props = {
    client: Client
    expanded: boolean
    onToggleExpand: () => void
    totalDebt: number
    fetchClients: () => void
}

const ClientCardItem: React.FC<Props> = ({
    client,
    expanded,
    onToggleExpand,
    totalDebt,
    fetchClients,
}) => {
    const [isPagoModalOpen, setIsPagoModalOpen] = useState(false)
    const [isPresupuestoModalOpen, setIsPresupuestoModalOpen] = useState(false)

    const togglePresupuestoModal = () => {
        setIsPresupuestoModalOpen(!isPresupuestoModalOpen)
    }

    const togglePagoModal = () => {
        setIsPagoModalOpen(!isPagoModalOpen)
    }

    const handleDelete = () => {
        fetchClients()
    }

    const handleSubmitPay = () => {
        togglePagoModal()
        fetchClients()
    }

    const handleSubmitPresupuesto = () => {
        togglePresupuestoModal()
        fetchClients()
    }

    const clientDelete = async (clientId: string) => {
        if (!clientId) return

        try {
            const success = await deleteClient(clientId)
            if (success) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El cliente ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                handleDelete()
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el cliente.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleConfirmDelete = (clientId: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                clientDelete(clientId)
            }
        })
    }

    return (
        <Card key={client._id} className="card-shadow mb-2 bg-gray">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h5
                            className={`mr-3 ${
                                client.ClientStatus === 'Deudor'
                                    ? 'text-red-500'
                                    : ''
                            }`}
                        >
                            {client.ClientApellido !== ''
                                ? `${client.ClientApellido}, ${client.ClientName}`
                                : client.ClientName}
                        </h5>

                        <ClientDetailsDropdown client={client} />
                        <AddPresupuestoButton isOpen={togglePresupuestoModal} />
                        <AddPagoButton isOpen={togglePagoModal} />
                        <DeleteButton
                            size="medium"
                            onDelete={() => handleConfirmDelete(client._id)}
                        />
                    </div>

                    <div className="flex items-center">
                        <h6 className="mr-2">
                            Saldo:{' '}
                            <span
                                className={`${
                                    totalDebt < 0
                                        ? 'text-green-500'
                                        : totalDebt > 0
                                          ? 'text-red-500'
                                          : 'text-gray-500'
                                }`}
                            >
                                {formatCurrency(totalDebt)}
                            </span>
                        </h6>

                        <IconButton onClick={onToggleExpand} size="small">
                            {expanded ? (
                                <HiOutlineChevronUp />
                            ) : (
                                <HiOutlineChevronDown />
                            )}
                        </IconButton>
                    </div>
                </div>

                <div
                    className={`content-wrapper ${
                        expanded ? 'expanded' : 'collapsed'
                    }`}
                >
                    <div className="mt-3">
                        <PresupuestosCardList
                            presupuestos={client.Presupuestos}
                            clientId={client._id}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>

            <AddPagoModal
                isOpen={isPagoModalOpen}
                toggleModal={togglePagoModal}
                selectedClientIndex={client._id}
                onSubmitPay={handleSubmitPay}
            />

            <AddPresupuestoModal
                isOpen={isPresupuestoModalOpen}
                toggleModal={togglePresupuestoModal}
                selectedClientIndex={client._id}
                onSubmitPay={handleSubmitPresupuesto}
            />
        </Card>
    )
}

export default ClientCardItem
