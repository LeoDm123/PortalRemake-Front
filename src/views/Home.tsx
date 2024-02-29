import React, { useState, useEffect } from 'react'
import { fetchSalesStats, fetchPayments } from '../api/api'
import HomeCard from '../components/template/HomeView/HomeCard'
import FormatCurrency from '@/utils/hooks/formatCurrency'
import { FormatNumber } from '@/utils/hooks/formatNumber'

const Home: React.FC = () => {
    const LOCAL_STORAGE_USER_KEY: string = 'user'
    const storedUser: any = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '',
    )
    const [sales, setSales] = useState<any>(null)
    const [salesLast7Days, setSalesLast7Days] = useState<any>(null)
    const [salesToday, setSalesToday] = useState<any>(null)
    const [salesLastDay, setsalesLastDay] = useState<any>(null)
    const [salesLastMonth, setsalesLastMonth] = useState<any>(null)

    useEffect(() => {
        fetchSalesStats(storedUser.id)
            .then((salesData: any) => {
                setSales(salesData)
                setSalesLast7Days(salesData.salesLast7Days)
                setSalesToday(salesData.salesToday)
                setsalesLastDay(salesData.salesLastDay)
                setsalesLastMonth(salesData.salesLastMonth)
            })
            .catch((error: any) => {
                console.error('Error fetching sales stats:', error)
            })
    }, [storedUser.id])

    const formattedSalesToday = salesToday
        ? FormatCurrency()(salesToday.monto)
        : ''
    const formattedSalesLast7Days = salesLast7Days
        ? FormatCurrency()(salesLast7Days.monto)
        : ''
    const formattedSalesLastDay = salesLastDay
        ? FormatCurrency()(salesLastDay.monto)
        : ''
    const formattedSalesLastMonth = salesLastMonth
        ? FormatCurrency()(salesLastMonth.monto)
        : ''

    const { formatNumber } = FormatNumber()

    const formattedNumberSalesToday = salesToday
        ? formatNumber(salesToday.cantidad)
        : ''
    const formattedNumberSalesLast7Days = salesLast7Days
        ? formatNumber(salesLast7Days.cantidad)
        : ''
    const formattedNumberSalesLastDay = salesLastDay
        ? formatNumber(salesLastDay.cantidad)
        : ''
    const formattedNumberSalesLastMonth = salesLastMonth
        ? formatNumber(salesLastMonth.cantidad)
        : ''

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ width: '25%', padding: '5px' }}>
                {salesToday && (
                    <HomeCard header="Ventas de hoy">
                        <p>Cantidad Total: {formattedNumberSalesToday}</p>
                        <p>Monto Total: {formattedSalesToday}</p>
                    </HomeCard>
                )}
            </div>
            <div style={{ width: '25%', padding: '5px' }}>
                {salesLast7Days && (
                    <HomeCard header="Ventas en los últimos 7 días">
                        <p>Cantidad Total: {formattedNumberSalesLast7Days}</p>
                        <p>Monto Total: {formattedSalesLast7Days}</p>
                    </HomeCard>
                )}
            </div>
            <div style={{ width: '25%', padding: '5px' }}>
                {salesLastDay && (
                    <HomeCard header="Ventas de ayer">
                        <p>Cantidad Total: {formattedNumberSalesLastDay}</p>
                        <p>Monto Total: {formattedSalesLastDay}</p>
                    </HomeCard>
                )}
            </div>
            <div style={{ width: '25%', padding: '5px' }}>
                {salesLastMonth && (
                    <HomeCard header="Ventas del último mes">
                        <p>Cantidad Total: {formattedNumberSalesLastMonth}</p>
                        <p>Monto Total: {formattedSalesLastMonth}</p>
                    </HomeCard>
                )}
            </div>
        </div>
    )
}

export default Home
