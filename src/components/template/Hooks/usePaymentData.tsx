import { useState, useEffect } from 'react'
import { fetchPayments } from '@/api/api'

interface Payment {
    process_date: string
    id: string
    neto: string
    fecha: string
}

export const usePaymentsData = (userId: string, Page: number): Payment[] => {
    const [payments, setPayments] = useState<Payment[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentsData = await fetchPayments(userId, Page)
                setPayments(paymentsData)
            } catch (error) {
                console.error('Error al obtener los pagos:', error)
            }
        }

        if (userId) {
            fetchData()
        }
    }, [userId])

    return payments
}
