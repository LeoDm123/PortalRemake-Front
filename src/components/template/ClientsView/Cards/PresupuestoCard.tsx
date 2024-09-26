import React from 'react'
import { Card } from '@/components/ui'
import formatCurrency from '@/utils/hooks/formatCurrency'

type PresupuestoCardProps = {
    presupuesto: Presupuesto
}

const calculatePendingAmount = (presupuesto: Presupuesto): number => {
    const totalPayments = (concepts: string[]) =>
        presupuesto.Pagos?.filter((pago) =>
            concepts.includes(pago.PagoConcepto),
        ).reduce((acc, pago) => acc + pago.PagoMonto, 0) || 0

    const anticipoSaldoPayments = totalPayments([
        'Anticipo Parcial',
        'Anticipo Completo',
        'Saldo Parcial',
        'Saldo Completo',
    ])
    const actualizacionPayments = totalPayments(['Actualización'])
    const extraPayments = totalPayments(['Extra'])

    return (
        presupuesto.Total -
        anticipoSaldoPayments +
        actualizacionPayments +
        extraPayments
    )
}

const PresupuestoCard: React.FC<PresupuestoCardProps> = ({ presupuesto }) => {
    return (
        <Card className="mb-2">
            <div className="flex justify-between w-full">
                <p>Código: {presupuesto.PresupuestoCodigo}</p>
                <p>Estado: {presupuesto.Estado}</p>
                <p>
                    <strong>
                        {formatCurrency(calculatePendingAmount(presupuesto))}
                    </strong>
                </p>
            </div>
        </Card>
    )
}

export default PresupuestoCard
