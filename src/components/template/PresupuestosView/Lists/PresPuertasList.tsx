import React from 'react'
import { Table } from '@/components/ui/Table'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import Tr from '@/components/ui/Table/Tr'
import { Chip } from '@mui/material'
import { Presupuesto } from '@/@types/presupuesto'
import PresPuertaInfoButton from '../Buttons/PresPuertaInfoButton'
import DeleteButton from '../../DeleteButton'
import Swal from 'sweetalert2'
import { deletePresPuerta } from '@/api/api'
import PrintPresPuertasButton from '../Buttons/PrintPresPuertasButton'
import EditButton from '../../EditButton'

interface PresPuertasListProps {
    presupuestos: Presupuesto[]
    onDelete: () => void
    onEdit: (presupuesto: Presupuesto) => void
}

const PresPuertasList: React.FC<PresPuertasListProps> = ({
    presupuestos,
    onDelete,
    onEdit,
}) => {
    const getStatusColor = (status: Presupuesto['Status']) => {
        switch (status) {
            case 'Aprobado':
                return 'success'
            case 'Pendiente':
                return 'warning'
            case 'Rechazado':
                return 'error'
            default:
                return 'default'
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(price)
    }

    const presDelete = async (presId: string) => {
        if (!presId) return

        try {
            const response = await deletePresPuerta(presId)
            console.log('respuesta', response)

            Swal.fire({
                title: 'Eliminado',
                text: 'El presupuesto ha sido eliminado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            onDelete()
        } catch (error) {
            console.error('Error al eliminar el presupuesto:', error)
            Swal.fire({
                title: 'Error',
                text:
                    error instanceof Error
                        ? error.message
                        : 'Hubo un problema al eliminar el presupuesto.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleConfirmDelete = (presId: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este presupuesto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                presDelete(presId)
            }
        })
    }

    const handleEditPresupuesto = (presupuesto: Presupuesto) => () => {
        onEdit(presupuesto)
    }

    return (
        <Table>
            <THead>
                <Th align="center" style={{ width: '10%' }}>
                    Código
                </Th>
                <Th align="center" style={{ width: '20%' }}>
                    Cliente
                </Th>
                <Th align="center" style={{ width: '20%' }}>
                    Obra
                </Th>
                <Th align="center" style={{ width: '15%' }}>
                    Precio Final
                </Th>
                <Th align="center" style={{ width: '10%' }}>
                    Cant. Puertas
                </Th>
                <Th align="center" style={{ width: '10%' }}>
                    Status
                </Th>
                <Th align="center" style={{ width: '10%' }}></Th>
            </THead>
            <TBody>
                {presupuestos.map((presupuesto) => (
                    <Tr key={presupuesto._id}>
                        <Td align="center" style={{ width: '10%' }}>
                            {presupuesto.Codigo}
                        </Td>
                        <Td align="center" style={{ width: '20%' }}>
                            {presupuesto.Cliente}
                        </Td>
                        <Td align="center" style={{ width: '20%' }}>
                            {presupuesto.Obra}
                        </Td>
                        <Td align="center" style={{ width: '15%' }}>
                            {formatPrice(presupuesto.PrecioFinal)}
                        </Td>
                        <Td align="center" style={{ width: '10%' }}>
                            {presupuesto.Puertas.length}
                        </Td>
                        <Td align="center" style={{ width: '10%' }}>
                            <Chip
                                label={presupuesto.Status}
                                color={getStatusColor(presupuesto.Status)}
                                size="small"
                            />
                        </Td>
                        <Td align="center" style={{ width: '10%', padding: 0 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '4px',
                                }}
                            >
                                <PresPuertaInfoButton
                                    presupuesto={presupuesto}
                                    size="small"
                                />
                                <EditButton
                                    size="small"
                                    isOpen={handleEditPresupuesto(presupuesto)}
                                />
                                <DeleteButton
                                    size="small"
                                    onDelete={() =>
                                        handleConfirmDelete(presupuesto._id)
                                    }
                                />
                                <PrintPresPuertasButton
                                    size="small"
                                    presupuesto={presupuesto}
                                />
                            </div>
                        </Td>
                    </Tr>
                ))}
            </TBody>
        </Table>
    )
}

export default PresPuertasList
