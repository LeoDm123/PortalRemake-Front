import { Presupuesto } from '@/@types/clientInfo'

export const calculateTotalDebt = (presupuestos: Presupuesto[]): number => {
    return presupuestos.reduce((sum, presupuesto) => {
        const totalPayments = (concepts: string[]) =>
            presupuesto.Pagos?.filter((pago) =>
                concepts.includes(pago.PagoConcepto),
            ).reduce((acc, pago) => acc + pago.PagoMonto, 0) || 0

        const Payments = totalPayments([
            'Anticipo Parcial',
            'Anticipo Completo',
            'Saldo Parcial',
            'Saldo Completo',
        ])

        const Discounts = totalPayments(['Descuento Extra'])

        const Paybacks = totalPayments([
            'Devolución Parcial',
            'Devolución Completa',
        ])
        const Taxes = totalPayments(['Retención de Impuestos'])
        const Updates = totalPayments(['Actualización'])
        const Extra = totalPayments(['Extra'])

        return (
            sum +
            (presupuesto.Total -
                Payments -
                Discounts -
                Taxes +
                Paybacks +
                Updates +
                Extra)
        )
    }, 0)
}
