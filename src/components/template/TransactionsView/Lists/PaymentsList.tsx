import React, { useState, useEffect } from 'react'
import { fetchPayments } from '@/api/api'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import TBody from '@/components/ui/Table/TBody'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import { Pagination, Spinner } from '@/components/ui'
import FormatCurrency from '@/utils/hooks/formatCurrency'
import '../Transactions.css'

interface Payment {
    id: number
    terminal_id: string
    medio: string
    comis: string
    iibb: string
    iva: string
    neto: string
    status: string
    fecha: string
    acreditacion: string
}

const PaymentsList = () => {
    const LOCAL_STORAGE_USER_KEY = 'user'
    const storedUserJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    const storedUser = storedUserJson ? JSON.parse(storedUserJson) : {}

    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage] = useState<number>(11)
    const formatCurrency = FormatCurrency('es-AR')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const paymentsData = await fetchPayments(storedUser.id)
                setPayments(paymentsData)
                console.log(paymentsData)
            } catch (error) {
                console.error('Error fetching payments:', error)
                setError('Error fetching payments. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (storedUser && storedUser.id) {
            fetchData()
        }
    }, [storedUser.id])

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem)

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner />
            </div>
        )
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    const getStatusClass = (status: string) => {
        return status === 'aprobado' ? 'approved' : 'disapproved'
    }

    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th style={{ textAlign: 'center' }}>Terminal ID</Th>
                        <Th style={{ textAlign: 'center' }}>Medio</Th>
                        <Th className="text-header">Comis.</Th>
                        <Th className="text-header">IVA</Th>
                        <Th className="text-header">IIBB</Th>
                        <Th className="text-header">Neto</Th>
                        <Th className="text-header">Estado</Th>
                        <Th className="text-header">Fecha</Th>
                        <Th className="text-header">Acreditación</Th>
                    </Tr>
                </THead>
                <TBody>
                    {currentItems.map((payment) => (
                        <Tr key={payment.id}>
                            <Td>{payment.terminal_id}</Td>
                            <Td>{payment.medio}</Td>
                            <Td>{formatCurrency(parseFloat(payment.comis))}</Td>
                            <Td>{formatCurrency(parseFloat(payment.iva))}</Td>
                            <Td>{formatCurrency(parseFloat(payment.iibb))}</Td>
                            <Td>{formatCurrency(parseFloat(payment.neto))}</Td>
                            <Td className={getStatusClass(payment.status)}>
                                {payment.status}
                            </Td>
                            <Td>{payment.fecha}</Td>
                            <Td>{payment.acreditacion}</Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
            <div className="pagination-container">
                <Pagination
                    currentPage={currentPage}
                    total={payments.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default PaymentsList
