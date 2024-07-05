import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import { fetchBudgets } from '@/api/api'
import calculateNextPaymentDate from '@/utils/hooks/calculateNextPaymentDay'
import formatNumber from '@/utils/hooks/formatNumber'
import useFormatDate from '@/utils/hooks/formatDate'
import { fetchIncomes } from '@/api/api'

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

interface Budget {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    porcentaje: number
    repetir: string
    fechaPago: Date
    comentarios: string
}

const BudgetList = () => {
    const [email, setEmail] = useState<string>('')
    const [incomes, setIncomes] = useState<Income[]>([])
    const [budgets, setBudgets] = useState<Budget[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
    }, [])

    useEffect(() => {
        const fetchBudgetsData = async () => {
            if (email) {
                try {
                    const budgetData = await fetchBudgets(email)
                    if (Array.isArray(budgetData)) {
                        setBudgets(budgetData)
                    } else if (budgetData && budgetData.presupuestos) {
                        setBudgets(budgetData.presupuestos)
                    } else {
                        console.error('Unexpected response format:', budgetData)
                    }
                } catch (error) {
                    console.error('Error fetching budgets:', error)
                }
            }
        }

        fetchBudgetsData()
    }, [email])

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

    const calculateTotalIncome = (incomes: Income[]): number => {
        return incomes.reduce((total, income) => total + income.monto, 0)
    }

    const totalIncome = calculateTotalIncome(incomes)

    return (
        <div className="h-[65vh]">
            <Table>
                <THead>
                    <Th style={{ width: '12%' }}>Categoría</Th>
                    <Th style={{ width: '12%' }}>Subcategoría</Th>
                    <Th style={{ width: '15%' }}>Monto USD</Th>
                    <Th style={{ width: '15%' }}>Monto ARS</Th>
                    <Th style={{ width: '10%' }}>Porcentaje</Th>
                    <Th style={{ width: '12%' }}>Próx. Descuento</Th>
                    <Th>Comentarios</Th>
                </THead>
                <TBody>
                    {budgets.map((budget) => (
                        <tr key={budget._id}>
                            <Td style={{ textAlign: 'center' }}>
                                {budget.categoria}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {budget.subCategoria}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {budget.divisa === 'USD'
                                    ? 'USD ' + format(budget.monto)
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {budget.divisa === 'ARS'
                                    ? 'ARS ' +
                                      format(
                                          budget.monto === 0 &&
                                              budget.porcentaje > 0
                                              ? (totalIncome *
                                                    budget.porcentaje) /
                                                    100
                                              : budget.monto,
                                      )
                                    : ''}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {format(
                                    budget.porcentaje === 0 && budget.monto > 0
                                        ? (budget.monto / totalIncome) * 100
                                        : budget.porcentaje,
                                )}
                                %
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {calculateNextPaymentDate(
                                    new Date(budget.fechaPago),
                                    budget.repetir,
                                ) === 'Acreditado'
                                    ? 'Acreditado'
                                    : formatDate(
                                          new Date(
                                              calculateNextPaymentDate(
                                                  new Date(budget.fechaPago),
                                                  budget.repetir,
                                              ),
                                          ),
                                      )}
                            </Td>
                            <Td style={{ textAlign: 'center' }}>
                                {budget.comentarios}
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default BudgetList
