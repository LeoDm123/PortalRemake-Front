import React from 'react'
import Td from '@/components/ui/Table/Td'
import formatCurrency from '@/utils/hooks/formatCurrency'
import {
    calculateTotalPayments,
    calculateActualizacion,
    calculateExtra,
    calculateSaldo,
} from '@/utils/hooks/paymentCalculations'
import PresupuestoModal from '../Modal/PresupuestoModal'
import '../clientViewStyles.css'
import { Presupuesto } from '@/@types/clientInfo'
import Swal from 'sweetalert2'
import { deletePres } from '@/api/api'
import DeleteButton from '../../DeleteButton'

type PresupuestoRowProps = {
    presupuesto: Presupuesto
    clientId: string
    onDelete: () => void
}

const PresupuestoRow: React.FC<PresupuestoRowProps> = ({
    presupuesto,
    clientId,
    onDelete,
}) => {
    const handleDelete = async (presupuesto: string) => {
        if (!presupuesto) return

        try {
            const success = await deletePres(clientId, presupuesto)
            if (success) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El presupuesto ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                onDelete()
            }
        } catch (error) {
            console.error('Error al eliminar el presupuesto:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el presupuesto.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleConfirmDelete = (presupuesto: string) => {
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
                handleDelete(presupuesto)
            }
        })
    }

    return (
        <tr key={presupuesto.PresupuestoCodigo}>
            <Td className="text-center no-wrap ">
                {presupuesto.PresupuestoCodigo}
            </Td>

            <Td className="text-center no-wrap ">
                {formatCurrency(presupuesto.Total)}
            </Td>
            <Td className="text-center no-wrap ">
                {formatCurrency(calculateTotalPayments(presupuesto))}
            </Td>
            <Td className="text-center no-wrap ">
                {formatCurrency(calculateActualizacion(presupuesto))}
            </Td>
            <Td className="text-center no-wrap ">
                {formatCurrency(calculateExtra(presupuesto))}
            </Td>
            <Td className="text-center no-wrap ">
                {formatCurrency(calculateSaldo(presupuesto))}
            </Td>
            <Td className="text-center flex justify-between items-center">
                <PresupuestoModal
                    presupuesto={presupuesto}
                    clientId={clientId}
                    onDelete={onDelete}
                />
                <DeleteButton
                    onDelete={() => handleConfirmDelete(presupuesto._id)}
                />
            </Td>
        </tr>
    )
}

export default PresupuestoRow
