import { addDays, addWeeks, addMonths, isBefore } from 'date-fns'

const calculateNextPaymentDate = (fechaPago: Date, repetir: string): string => {
    const fecha = new Date(fechaPago)
    const today = new Date()
    let nextDate = fecha

    while (isBefore(nextDate, today)) {
        switch (repetir) {
            case 'Diariamente':
                nextDate = addDays(nextDate, 1)
                break
            case 'Semanalmente':
                nextDate = addWeeks(nextDate, 1)
                break
            case 'Mensualmente':
                nextDate = addMonths(nextDate, 1)
                break
            case 'Anualmente':
                nextDate = addMonths(nextDate, 12)
                break
            default:
                return 'Acreditado'
        }
    }

    return nextDate <= today ? 'Acreditado' : nextDate.toISOString()
}

export default calculateNextPaymentDate
