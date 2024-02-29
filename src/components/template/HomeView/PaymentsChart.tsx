import React, { useState, useEffect, useRef } from 'react'
import { fetchPayments } from '@/api/api'
import Chart from 'chart.js/auto'

interface Payment {
    process_date: string
    id: string
    neto: string
}

const PaymentsChart: React.FC = () => {
    const LOCAL_STORAGE_USER_KEY = 'user'
    const storedUserJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    const storedUser = storedUserJson ? JSON.parse(storedUserJson) : {}

    const [payments, setPayments] = useState<Payment[]>([])
    const [selectedRange, setSelectedRange] = useState<string>('day') // 'day', 'week', 'month'
    const chartRef = useRef<Chart>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentsData = await fetchPayments(storedUser.id)
                setPayments(paymentsData)
                console.log('Datos de pagos recibidos:', paymentsData)
            } catch (error) {
                console.error('Error al obtener los pagos:', error)
            }
        }

        if (storedUser && storedUser.id) {
            fetchData()
        }
    }, [storedUser.id, selectedRange])

    useEffect(() => {
        const filteredPayments = filterPaymentsByRange(payments, selectedRange)
        const groupedPayments = groupPaymentsByDate(filteredPayments)

        const dates = Object.keys(groupedPayments)
        const netoValues = Object.values(groupedPayments)

        console.log(dates)
        console.log(netoValues)

        const ctx = document.getElementById(
            'paymentsChart',
        ) as HTMLCanvasElement

        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy()
            }

            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Neto',
                            data: netoValues,
                            backgroundColor: 'rgba(21,46,77,0.8)',
                            borderColor: 'rgba(18,38,63,0.8)',
                            borderWidth: 2,
                            tension: 0.45,
                            fill: true,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            })
        }
    }, [payments, selectedRange])

    const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRange(event.target.value)
    }

    return (
        <div>
            <h2>Payments Chart</h2>
            <div>
                <label htmlFor="range">Seleccione el rango:</label>
                <select
                    id="range"
                    value={selectedRange}
                    onChange={handleRangeChange}
                >
                    <option value="day">Día</option>
                    <option value="week">Semana</option>
                    <option value="month">Mes</option>
                </select>
            </div>
            <canvas id="paymentsChart" width="400" height="200"></canvas>
        </div>
    )
}

const filterPaymentsByRange = (
    payments: Payment[],
    range: string,
): Payment[] => {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
    const oneWeekAgo = new Date(today.getTime() - 7 * oneDay)
    const oneMonthAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate(),
    ) // not exact, but simple for demonstration

    switch (range) {
        case 'day':
            return payments.filter((payment) =>
                isSameDay(new Date(payment.process_date), today),
            )
        case 'week':
            return payments.filter(
                (payment) => new Date(payment.process_date) > oneWeekAgo,
            )
        case 'month':
            return payments.filter(
                (payment) => new Date(payment.process_date) > oneMonthAgo,
            )
        default:
            return payments
    }
}

const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

const groupPaymentsByDate = (
    payments: Payment[],
): { [date: string]: number } => {
    const groupedPayments: { [date: string]: number } = {}

    payments.forEach((payment) => {
        const date = payment.process_date.split('T')[0] // Extract date part without time
        const neto = parseFloat(payment.neto)

        if (groupedPayments[date]) {
            groupedPayments[date] += neto
        } else {
            groupedPayments[date] = neto
        }
    })

    return groupedPayments
}

export default PaymentsChart
