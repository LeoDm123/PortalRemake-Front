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

export const calculateTotalDiscounts = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, ['Descuento Extra'])
}

export const calculateTotalTaxes = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, ['Retención de Impuestos'])
}

export const calculateTotalPaybacks = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, [
        'Devolución Parcial',
        'Devolución Completa',
    ])
}

export const calculateTotalUpdate = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, ['Actualización'])
}

export const calculateTotalExtra = (presupuesto: Presupuesto): number => {
    return calculatePaymentsByConcept(presupuesto, ['Extra'])
}

export const calculateDebt = (presupuesto: Presupuesto): number => {
    const Pagos = calculateTotalPayments(presupuesto)
    const Descuentos = calculateTotalDiscounts(presupuesto)
    const Impuestos = calculateTotalTaxes(presupuesto)
    const Devoluciones = calculateTotalPaybacks(presupuesto)
    const Extras = calculateTotalExtra(presupuesto)
    const Update = calculateTotalUpdate(presupuesto)

    return (
        presupuesto.Total -
        Pagos -
        Descuentos -
        Impuestos +
        Devoluciones +
        Extras +
        Update
    )
}
