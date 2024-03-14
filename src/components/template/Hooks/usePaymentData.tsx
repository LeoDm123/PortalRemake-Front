import { useState, useEffect } from 'react'
import { fetchPaymentsGrap } from '@/api/api'

interface PaymentData {
    dias: {
        labels: string[]
        values: number[]
        quantity: number[]
    }
    mes: {
        labels: string[]
        values: number[]
        quantity: number[]
    }
}

export const usePaymentsGrapData = (
    userId: string,
    selectedValue: string,
): PaymentData | null => {
    const [payments, setPayments] = useState<PaymentData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentsData = await fetchPaymentsGrap(userId)
                const filteredPayments = filterPayments(
                    paymentsData.data,
                    selectedValue,
                )
                setPayments(filteredPayments)
            } catch (error) {
                console.error('Error al obtener los pagos:', error)
            }
        }

        if (userId) {
            fetchData()
        }
    }, [userId, selectedValue])

    const filterPayments = (
        data: PaymentData,
        selectedValue: string,
    ): PaymentData => {
        if (!data || !data.dias || !data.mes) {
            return {
                dias: { labels: [], values: [], quantity: [] },
                mes: { labels: [], values: [], quantity: [] },
            }
        }

        const currentDate = new Date()
        const filteredData: PaymentData = {
            dias: { labels: [], values: [], quantity: [] },
            mes: { labels: [], values: [], quantity: [] },
        }

        const isSameDay = (date1: Date, date2: Date) => {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            )
        }

        if (selectedValue === 'day' || selectedValue === 'yesterday') {
            const today = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - 1,
            )
            const yesterday = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - 2,
            )

            const startOfWeek = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - currentDate.getDay(),
            )
            const endOfWeek = new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                startOfWeek.getDate() + 6,
            )

            const weekLabels: string[] = []
            const weekValues: number[] = []
            const weekQuantities: number[] = []

            const LastDayOfWeek = new Date(startOfWeek)
            while (LastDayOfWeek <= endOfWeek) {
                const label = LastDayOfWeek.toISOString().split('T')[0]
                weekLabels.push(label)

                const dataIndex = data.dias.labels.indexOf(label)
                if (
                    (selectedValue === 'day' &&
                        isSameDay(today, new Date(label))) ||
                    (selectedValue === 'yesterday' &&
                        isSameDay(yesterday, new Date(label)))
                ) {
                    if (dataIndex !== -1) {
                        weekValues.push(data.dias.values[dataIndex])
                        weekQuantities.push(data.dias.quantity[dataIndex])
                    } else {
                        weekValues.push(0)
                        weekQuantities.push(0)
                    }
                } else {
                    weekValues.push(0)
                    weekQuantities.push(0)
                }

                LastDayOfWeek.setDate(LastDayOfWeek.getDate() + 1)
            }

            filteredData.dias.labels = weekLabels
            filteredData.dias.values = weekValues
            filteredData.dias.quantity = weekQuantities
        } else if (selectedValue === 'week') {
            const startOfWeek = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - currentDate.getDay(),
            )
            const endOfWeek = new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                startOfWeek.getDate() + 6,
            )

            const weekLabels: string[] = []
            const weekValues: number[] = []
            const weekQuantities: number[] = []

            let currentDateOfWeek = new Date(startOfWeek)
            while (currentDateOfWeek <= endOfWeek) {
                const formattedDate = currentDateOfWeek
                    .toISOString()
                    .split('T')[0]
                const dataIndex = data.dias.labels.indexOf(formattedDate)

                if (dataIndex !== -1) {
                    weekLabels.push(formattedDate)
                    weekValues.push(data.dias.values[dataIndex])
                    weekQuantities.push(data.dias.quantity[dataIndex])
                } else {
                    weekLabels.push(formattedDate)
                    weekValues.push(0)
                    weekQuantities.push(0)
                }

                currentDateOfWeek.setDate(currentDateOfWeek.getDate() + 1)
            }

            filteredData.dias.labels = weekLabels
            filteredData.dias.values = weekValues
            filteredData.dias.quantity = weekQuantities
        } else if (selectedValue === 'month') {
            const startOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1,
            )
            const endOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                0,
            )

            data.dias.labels.forEach((label, index) => {
                const labelDate = new Date(label)

                if (labelDate >= startOfMonth && labelDate <= endOfMonth) {
                    filteredData.dias.labels.push(label)
                    filteredData.dias.values.push(data.dias.values[index])
                    filteredData.dias.quantity.push(data.dias.quantity[index])
                }
            })
        }

        return filteredData
    }

    return payments
}
