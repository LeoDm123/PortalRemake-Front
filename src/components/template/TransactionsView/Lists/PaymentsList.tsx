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
    arancel: string
    iibb: string
    iva: string
    neto: string
    final_amount: string
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
    const [totalPages, setTotalPages] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(0)
    const formatCurrency = FormatCurrency('es-AR')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetchPayments(storedUser.id, currentPage)
                console.log(response.payments.data)
                setPayments(response.payments.data)
                setTotalPages(response.payments.last_page)
                setPerPage(parseInt(response.payments.per_page))
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
    }, [storedUser.id, currentPage])

    const handlePageChange = (pageNumber: number) => {
        console.log('page', pageNumber)
        setCurrentPage(pageNumber)
    }

    if (!payments || !Array.isArray(payments)) {
        return <div>No hay pagos disponibles.</div>
    }

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
            <div className="payments-list-container">
                <Table className="payments-table">
                    <THead className="payments-table-head">
                        <Tr>
                            <Th style={{ textAlign: 'center' }}>Terminal ID</Th>
                            <Th style={{ textAlign: 'center' }}>Medio</Th>
                            <Th style={{ textAlign: 'center' }}>Neto</Th>
                            <Th style={{ textAlign: 'center' }}>Arancel</Th>
                            <Th style={{ textAlign: 'center' }}>IVA</Th>
                            <Th style={{ textAlign: 'center' }}>IIBB</Th>
                            <Th style={{ textAlign: 'center' }}>Total</Th>
                            <Th style={{ textAlign: 'center' }}>Estado</Th>
                            <Th style={{ textAlign: 'center' }}>Fecha</Th>
                            <Th style={{ textAlign: 'center' }}>
                                Acreditación
                            </Th>
                        </Tr>
                    </THead>
                    <TBody className="payments-table-body">
                        {payments.map((payment) => (
                            <Tr key={payment.id}>
                                <Td style={{ textAlign: 'center' }}>
                                    {payment.terminal_id}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {payment.medio}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {formatCurrency(parseFloat(payment.neto))}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {formatCurrency(
                                        parseFloat(payment.arancel),
                                    )}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {formatCurrency(parseFloat(payment.iva))}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {formatCurrency(parseFloat(payment.iibb))}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {formatCurrency(
                                        parseFloat(payment.final_amount),
                                    )}
                                </Td>
                                <Td className={getStatusClass(payment.status)}>
                                    {payment.status}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {payment.fecha}
                                </Td>
                                <Td style={{ textAlign: 'center' }}>
                                    {payment.acreditacion}
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
            <div className="pagination-container">
                <Pagination
                    currentPage={currentPage}
                    total={totalPages}
                    pageSize={perPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default PaymentsList
