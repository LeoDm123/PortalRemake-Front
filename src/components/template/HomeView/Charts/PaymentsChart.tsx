import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { usePaymentsData } from '../../Hooks/usePaymentData'
import { useChartData } from '../../Hooks/useChartData'

interface Payment {
    process_date: string
    id: string
    neto: string
}

const PaymentsChart: React.FC<{
    onSelectedValue: string
}> = ({ onSelectedValue }) => {
    const LOCAL_STORAGE_USER_KEY = 'user'
    const storedUserJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    const storedUser = storedUserJson ? JSON.parse(storedUserJson) : {}

    const payments = usePaymentsData(storedUser.id)
    const chartData = useChartData(payments, onSelectedValue)
    const chartRef = useRef<Chart>()

    console.log(chartData)

    useEffect(() => {
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
                    labels: chartData.dates,
                    datasets: [
                        {
                            label: 'Neto',
                            data: chartData.netoValues,
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
    }, [payments, onSelectedValue])

    return (
        <div>
            <canvas id="paymentsChart" width="400" height="200"></canvas>
        </div>
    )
}

export default PaymentsChart
