import React, { useEffect, useState } from 'react'
import { fetchActiveClients } from '@/api/api'
import { Client } from '@/@types/clientInfo'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { calculateTotalDebt } from '@/utils/hooks/calculateClientDebt'
import DividerMain from '../../DividerMain'
import formatCurrency from '@/utils/hooks/formatCurrency'

const ClientsList: React.FC = () => {
    const [clientes, setClientes] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getClientes = async () => {
            try {
                const data = await fetchActiveClients()
                setClientes(data)
            } catch (err) {
                setError('Error al obtener los clientes activos')
            } finally {
                setLoading(false)
            }
        }

        getClientes()
    }, [])

    const getTotalDeudaGeneral = (): number => {
        return clientes.reduce((acc, cliente) => {
            return acc + calculateTotalDebt(cliente.Presupuestos)
        }, 0)
    }

    if (loading) return <p>Cargando clientes...</p>
    if (error) return <p>{error}</p>
    if (clientes.length === 0) return <p>No hay clientes activos.</p>

    return (
        <div>
            <div>
                <div className="flex justify-between align-center">
                    <h5 style={{ color: '#01662b' }}>Clientes activos</h5>
                    <div className="pt-1 text-right ">
                        Total general:
                        {formatCurrency(
                            parseInt(
                                clientes
                                    .reduce(
                                        (acc, cliente) =>
                                            acc +
                                            calculateTotalDebt(
                                                cliente.Presupuestos,
                                            ),
                                        0,
                                    )
                                    .toFixed(2),
                            ),
                        )}
                    </div>
                </div>
                <DividerMain />
            </div>

            <Table>
                <THead>
                    <Th className="text-left pl-12" style={{ width: '50%' }}>
                        Cliente
                    </Th>
                    <Th className="text-right pr-12" style={{ width: '50%' }}>
                        Saldo
                    </Th>
                </THead>
            </Table>
            <div className="table-body-container">
                <Table>
                    <TBody>
                        {clientes.map((cliente) => {
                            const totalDebt = calculateTotalDebt(
                                cliente.Presupuestos,
                            )
                            return (
                                <tr key={cliente._id}>
                                    <Td
                                        className="text-left"
                                        style={{ width: '50%' }}
                                    >
                                        {cliente.ClientName}{' '}
                                        {cliente.ClientApellido}
                                    </Td>
                                    <Td
                                        className="text-right"
                                        style={{ width: '50%' }}
                                    >
                                        {formatCurrency(
                                            parseInt(totalDebt.toFixed(2)),
                                        )}
                                    </Td>
                                </tr>
                            )
                        })}
                    </TBody>
                </Table>
            </div>
        </div>
    )
}

export default ClientsList
