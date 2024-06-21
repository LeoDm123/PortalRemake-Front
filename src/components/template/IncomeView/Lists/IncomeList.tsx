import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import { fetchIncomes } from '@/api/api'
import formatNumber from '@/utils/hooks/formatNumber'
import { addDays, addWeeks, addMonths, isBefore } from 'date-fns'
import useFormatDate from '@/utils/hooks/formatDate'

type Income = {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    fechaPago: Date
    comentarios: string
}

const calculateNextPaymentDate = (
    fechaPago: Date,
    repetir: string,
): Date | null => {
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
                return null
        }
    }

    return nextDate
}

const IncomeList: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [invData, setInvData] = useState<any[]>([])
    const [incomes, setIncomes] = useState<Income[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
        setInvData(user.invites || [])
        console.log(invData)
    }, [])

    useEffect(() => {
        const fetchIncomesData = async () => {
            if (email) {
                try {
                    const incomesData = await fetchIncomes(email)
                    if (Array.isArray(incomesData)) {
                        setIncomes(incomesData)
                    } else if (incomesData && incomesData.ingresos) {
                        setIncomes(incomesData.ingresos)
                    } else {
                        console.error(
                            'Unexpected response format:',
                            incomesData,
                        )
                    }
                } catch (error) {
                    console.error('Error fetching incomes:', error)
                }
            }
        }

        fetchIncomesData()
    }, [email])

    return (
        <div>
            <Table>
                <THead>
                    <Th style={{ width: '12%' }}>Categoría</Th>
                    <Th style={{ width: '12%' }}>Subcategoría</Th>
                    <Th style={{ width: '15%' }}>Monto USD</Th>
                    <Th style={{ width: '15%' }}>Monto ARS</Th>
                    <Th style={{ width: '12%' }}>Acreditación</Th>
                    <Th style={{ width: '12%' }}>Próx. Acreditación</Th>
                    <Th>Comentarios</Th>
                </THead>
                <TBody>
                    {incomes.map((income) => (
                        <tr key={income._id}>
                            <Td style={{ textAlign: 'center' }}>
                                {income.categoria}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {income.subCategoria}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {income.divisa === 'USD'
                                    ? 'USD ' + format(income.monto)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {income.divisa === 'ARS'
                                    ? 'ARS ' + format(income.monto)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {income.repetir}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {formatDate(
                                    calculateNextPaymentDate(
                                        new Date(income.fechaPago),
                                        income.repetir,
                                    ) as Date,
                                )}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {income.comentarios}
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default IncomeList
