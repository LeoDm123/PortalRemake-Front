import { useState, useEffect } from 'react'

interface Payment {
    process_date: string
    id: string
    neto: string
    fecha: string
}

interface ChartData {
    dates: string[]
    netoValues: number[]
}

export const useChartData = (
    payments: Payment[],
    selectedValue: string,
): ChartData => {
    const [chartData, setChartData] = useState<ChartData>({
        dates: [],
        netoValues: [],
    })

    useEffect(() => {
        const isSameDay = (date1: Date, date2: Date): boolean => {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            )
        }

        const filterPaymentsByRange = (
            payments: Payment[],
            selectedValue: string,
        ): Payment[] => {
            const today = new Date()
            const oneDay = 24 * 60 * 60 * 1000
            const yesterday = new Date(today.getTime() - oneDay)
            const oneWeekAgo = new Date(today.getTime() - 7 * oneDay)
            const oneMonthAgo = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                today.getDate(),
            )

            switch (selectedValue) {
                case 'day':
                    return payments.filter((payment) =>
                        isSameDay(new Date(payment.fecha), today),
                    )
                case 'yesterday':
                    return payments.filter(
                        (payment) => new Date(payment.fecha) > yesterday,
                    )
                case 'week':
                    return payments.filter(
                        (payment) => new Date(payment.fecha) > oneWeekAgo,
                    )
                case 'month':
                    return payments.filter(
                        (payment) => new Date(payment.fecha) > oneMonthAgo,
                    )
                default:
                    return payments
            }
        }

        const groupPaymentsByDate = (
            payments: Payment[],
        ): { [date: string]: number } => {
            const groupedPayments: { [date: string]: number } = {}

            payments.forEach((payment) => {
                const date = payment.fecha
                const neto = parseFloat(payment.neto)

                if (groupedPayments[date]) {
                    groupedPayments[date] += neto
                } else {
                    groupedPayments[date] = neto
                }
            })

            return groupedPayments
        }

        const filteredPayments = filterPaymentsByRange(payments, selectedValue)
        const groupedPayments = groupPaymentsByDate(filteredPayments)

        const dates = Object.keys(groupedPayments)
        const netoValues = Object.values(groupedPayments)

        setChartData({ dates, netoValues })
    }, [payments, selectedValue])

    return chartData
}
