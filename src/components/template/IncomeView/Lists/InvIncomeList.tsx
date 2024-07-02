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

interface User {
    email: string
    invites: Invite[]
}

interface Invite {
    email: string
    _id: string
}

interface Income {
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

const InvIncomeList: React.FC = () => {
    const [invData, setInvData] = useState<Invite[]>([])
    const [incomes, setIncomes] = useState<Income[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user: User = JSON.parse(localStorage.getItem('user') || '{}')
        setInvData(user.invites || [])
    }, [])

    useEffect(() => {
        const fetchIncomesData = async () => {
            const allIncomes: Income[] = []

            const fetchUserIncomes = async (
                userEmail: string,
            ): Promise<Income[]> => {
                try {
                    const incomesData = await fetchIncomes(userEmail)
                    if (Array.isArray(incomesData)) {
                        return incomesData
                    } else if (incomesData && incomesData.ingresos) {
                        return incomesData.ingresos
                    } else {
                        console.error(
                            'Unexpected response format:',
                            incomesData,
                        )
                        return []
                    }
                } catch (error) {
                    console.error('Error fetching incomes:', error)
                    return []
                }
            }

            for (const invite of invData) {
                if (invite.email) {
                    const inviteIncomes = await fetchUserIncomes(invite.email)
                    allIncomes.push(...inviteIncomes)
                }
            }

            setIncomes(allIncomes)
        }

        fetchIncomesData()
    }, [invData])

    return (
        <div className="h-[65vh]">
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

export default InvIncomeList
