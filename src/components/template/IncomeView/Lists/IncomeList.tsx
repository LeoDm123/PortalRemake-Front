import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import { fetchIncomes } from '@/api/api'
import formatNumber from '@/utils/hooks/formatNumber'
import useFormatDate from '@/utils/hooks/formatDate'
import calculateNextPaymentDate from '@/utils/hooks/calculateNextPaymentDay'

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

const IncomeList: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [incomes, setIncomes] = useState<Income[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
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
                                {calculateNextPaymentDate(
                                    new Date(income.fechaPago),
                                    income.repetir,
                                ) === 'Acreditado'
                                    ? 'Acreditado'
                                    : formatDate(
                                          new Date(
                                              calculateNextPaymentDate(
                                                  new Date(income.fechaPago),
                                                  income.repetir,
                                              ),
                                          ),
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
