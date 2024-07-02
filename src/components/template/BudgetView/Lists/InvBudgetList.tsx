import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import { fetchBudgets, fetchIncomes } from '@/api/api'
import formatNumber from '@/utils/hooks/formatNumber'
import { addDays, addWeeks, addMonths, isBefore } from 'date-fns'
import useFormatDate from '@/utils/hooks/formatDate'

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

const InvExpenseList: React.FC = () => {
    const [invData, setInvData] = useState<Invite[]>([])
    const [incomes, setIncomes] = useState<Income[]>([])
    const [budgets, setBudgets] = useState<Budget[]>([])
    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setInvData(user.invites || [])
    }, [])

    console.log(invData)

    useEffect(() => {
        const fetchBudgetsData = async () => {
            const allBudgets: Budget[] = []

            const fetchUserBudgets = async (
                userEmail: string,
            ): Promise<Budget[]> => {
                try {
                    const BudgetData = await fetchBudgets(userEmail)
                    if (Array.isArray(BudgetData)) {
                        return BudgetData
                    } else if (BudgetData && BudgetData.presupuestos) {
                        return BudgetData.presupuestos
                    } else {
                        console.error('Unexpected response format:', BudgetData)
                        return []
                    }
                } catch (error) {
                    console.error('Error fetching Budgets:', error)
                    return []
                }
            }

            for (const invite of invData) {
                if (invite.email) {
                    const inviteBudgets = await fetchUserBudgets(invite.email)
                    allBudgets.push(...inviteBudgets)
                }
            }

            setBudgets(allBudgets)
        }

        fetchBudgetsData()
    }, [invData])

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
                                {formatDate(
                                    calculateNextPaymentDate(
                                        new Date(budget.fechaPago),
                                        budget.repetir,
                                    ) as Date,
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

export default InvExpenseList
