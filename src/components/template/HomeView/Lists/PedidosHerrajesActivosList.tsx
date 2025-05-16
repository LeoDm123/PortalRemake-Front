import React, { useEffect, useState } from 'react'
import { fetchPedidosHerrajesActivos } from '@/api/api'
import { Pedido } from '@/@types/pedidos'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import DividerMain from '../../DividerMain'

const PedidosHerrajesActivosList: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getPedidos = async () => {
            try {
                const data = await fetchPedidosHerrajesActivos()
                setPedidos(data)
            } catch (err) {
                setError('Error al obtener los logs')
            } finally {
                setLoading(false)
            }
        }

        getPedidos()
    }, [])

    if (loading) return <p>Cargando pedidos de herrajes...</p>
    if (error) return <p>{error}</p>
    if (pedidos.length === 0) return <p>No hay pedidos abiertos.</p>

    return (
        <div>
            <div>
                <h5 style={{ color: '#01662b' }}>
                    Pedidos de herrajes abiertos
                </h5>
                <DividerMain />
            </div>

            <Table>
                <THead>
                    <Th className="text-center" style={{ width: '50%' }}>
                        Obra
                    </Th>
                    <Th className="text-center" style={{ width: '25%' }}>
                        N° de Pedido
                    </Th>
                    <Th className="text-center" style={{ width: '25%' }}>
                        Fecha de Pedido
                    </Th>
                </THead>
            </Table>
            <div className="table-body-container">
                <Table>
                    <TBody>
                        {pedidos.map((pedido) => {
                            return (
                                <tr key={pedido._id}>
                                    <Td
                                        className="text-center"
                                        style={{ width: '50%' }}
                                    >
                                        {pedido.Obra}
                                    </Td>
                                    <Td
                                        className="text-center"
                                        style={{ width: '25%' }}
                                    >
                                        {pedido.NroPedido}
                                    </Td>
                                    <Td
                                        className="text-center"
                                        style={{ width: '25%' }}
                                    >
                                        {pedido.Fecha}
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

export default PedidosHerrajesActivosList
