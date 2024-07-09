import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Button, Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import formatNumber from '@/utils/hooks/formatNumber'
import useFormatDate from '@/utils/hooks/formatDate'
import calculateNextPaymentDate from '@/utils/hooks/calculateNextPaymentDay'
import calculateWeightedIncome from '@/utils/hooks/calculateWeightedIncome'
import navigationIcon from '@/configs/navigation-icon.config'
import { deleteExpense, fetchExpenseByID } from '@/api/api'
import Swal from 'sweetalert2'
import EditExpenseModal from '../Modal/EditExpenseModal'
import EditExpenseForm from '../Modal/Forms/EditExpenseForm'

interface User {
    email: string
    invites: Invite[]
}

interface Invite {
    email: string
    _id: string
}

interface Expense {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    cuotas: number
    fechaPago: Date
    comentarios: string
    dividir: boolean
    condDiv: string
    montoDiv: number
}

interface ExpenseListProps {
    currentPage: number
    pageSize: number
    expenses: Expense[]
}

const ExpenseList: React.FC<ExpenseListProps> = ({
    currentPage,
    pageSize,
    expenses,
}) => {
    const { percentage } = calculateWeightedIncome()
    const [email, setEmail] = useState<string>('')
    const [expenseData, setExpenseData] = useState<Expense[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

    const format = formatNumber()
    const formatDate = useFormatDate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
    }, [])

    const startIndex = (currentPage - 1) * pageSize
    const currentExpenses = expenses.slice(startIndex, startIndex + pageSize)

    const handleDelete = async (expenseId: string) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esto',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar',
            })

            if (result.isConfirmed) {
                await deleteExpense(email, expenseId)
                Swal.fire('Eliminado', 'El gasto ha sido eliminado.', 'success')
                console.log('Gasto eliminado correctamente')
            }
        } catch (error) {
            console.error('Error al eliminar el gasto:', error)
            Swal.fire('Error', 'Hubo un error al eliminar el gasto.', 'error')
        }
    }

    const handleEditExpense = async (expenseId: string) => {
        try {
            const expenseData = await fetchExpenseByID(email, expenseId)
            setSelectedExpense(expenseData.egreso)
            setIsModalOpen(true)
        } catch (error) {
            console.error('Error fetching expense:', error)
        }
    }

    const handleSaveExpense = (updatedExpense: Expense) => {
        setExpenseData((prevData) =>
            prevData.map((expense) =>
                expense._id === updatedExpense._id ? updatedExpense : expense,
            ),
        )
        setIsModalOpen(false)
    }

    return (
        <div className="h-[60vh]">
            <Table>
                <THead>
                    <Th style={{ width: '12%' }}>Categoría</Th>
                    <Th style={{ width: '12%' }}>Subcategoría</Th>
                    <Th style={{ width: '10%' }}>Dividido</Th>
                    <Th style={{ width: '15%' }}>Monto</Th>
                    <Th style={{ width: '2%' }}>Cuotas</Th>
                    <Th style={{ width: '15%' }}>Monto Cuota</Th>
                    <Th style={{ width: '11%' }}>Próx. Pago</Th>
                    <Th>Comentarios</Th>
                    <Th style={{ width: '5%' }}></Th>
                </THead>
                <TBody>
                    {currentExpenses.map((expense) => (
                        <tr key={expense._id}>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.categoria}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.subCategoria}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.dividir === true
                                    ? expense.condDiv
                                    : 'No dividir'}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.dividir === true
                                    ? expense.condDiv === 'Equitativamente'
                                        ? 'ARS ' +
                                          format(
                                              (expense.monto * percentage) /
                                                  100,
                                          )
                                        : expense.condDiv === 'Partes iguales'
                                          ? 'ARS ' + format(expense.monto / 2)
                                          : 'ARS ' + format(expense.montoDiv)
                                    : format(expense.monto)}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.cuotas}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.divisa === 'ARS'
                                    ? 'ARS ' +
                                      format(expense.monto / expense.cuotas)
                                    : ''}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {calculateNextPaymentDate(
                                    new Date(expense.fechaPago),
                                    expense.repetir,
                                ) === 'Acreditado'
                                    ? 'Acreditado'
                                    : formatDate(
                                          new Date(
                                              calculateNextPaymentDate(
                                                  new Date(expense.fechaPago),
                                                  expense.repetir,
                                              ),
                                          ),
                                      )}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                {expense.comentarios}
                            </Td>
                            <Td
                                style={{
                                    textAlign: 'center',
                                    padding: 0,
                                    height: 80,
                                }}
                            >
                                <Button
                                    icon={navigationIcon.edit}
                                    size="xs"
                                    style={{ marginRight: 2 }}
                                    onClick={() =>
                                        handleEditExpense(expense._id)
                                    }
                                />
                                <Button
                                    icon={navigationIcon.delete}
                                    size="xs"
                                    onClick={() => handleDelete(expense._id)}
                                />
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
            <EditExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <EditExpenseForm
                    expense={selectedExpense}
                    onSave={handleSaveExpense}
                    onClose={() => setIsModalOpen(false)}
                />
            </EditExpenseModal>
        </div>
    )
}

export default ExpenseList
