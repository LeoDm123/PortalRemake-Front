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
import { Presupuesto, Client } from '@/@types/clientInfo'

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
            <Td className="text-center">
                <PresupuestoModal
                    presupuesto={presupuesto}
                    clientId={clientId}
                    onDelete={onDelete}
                />
            </Td>
        </tr>
    )
}

export default PresupuestoRow
