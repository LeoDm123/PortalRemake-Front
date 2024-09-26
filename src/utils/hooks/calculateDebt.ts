import { Presupuesto } from '@/@types/clientInfo'

export const calculateTotalDebt = (presupuestos: Presupuesto[]): number => {
    return presupuestos.reduce((sum, presupuesto) => {
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
            sum +
            (presupuesto.Total -
                anticipoSaldoPayments +
                actualizacionPayments +
                extraPayments)
        )
    }, 0)
}
