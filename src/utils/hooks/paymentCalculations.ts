import { Presupuesto } from '@/@types/clientInfo'

export const calculatePaymentsByConcept = (
    presupuesto: Presupuesto,
    concepts: string[],
): number => {
    return (
        presupuesto.Pagos?.filter((pago) =>
            concepts.includes(pago.PagoConcepto),
        ).reduce((acc, pago) => acc + pago.PagoMonto, 0) || 0
    )
}

export const calculateTotalPayments = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, [
        'Anticipo Parcial',
        'Anticipo Completo',
        'Saldo Parcial',
        'Saldo Completo',
    ])
}

export const calculateActualizacion = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, ['Actualización'])
}

export const calculateExtra = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, ['Extra'])
}

export const calculateSaldo = (presupuesto: Presupuesto): number => {
    const Pagos = calculateTotalPayments(presupuesto)
    const Extras = calculateExtra(presupuesto)
    const Actualizacion = calculateActualizacion(presupuesto)

    return presupuesto.Total - Pagos + Extras + Actualizacion
}
