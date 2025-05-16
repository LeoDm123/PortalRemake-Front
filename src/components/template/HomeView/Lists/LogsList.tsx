import React, { useEffect, useState } from 'react'
import { fetchLastLogs } from '@/api/api'
import { InventarioLog } from '@/@types/mats'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import DividerMain from '../../DividerMain'

const LogsList: React.FC = () => {
    const [logs, setLogs] = useState<InventarioLog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getLogs = async () => {
            try {
                const data = await fetchLastLogs()
                setLogs(data)
            } catch (err) {
                setError('Error al obtener los logs')
            } finally {
                setLoading(false)
            }
        }

        getLogs()
    }, [])

    if (loading) return <p>Cargando movimientos de inventario...</p>
    if (error) return <p>{error}</p>
    if (logs.length === 0) return <p>No hay logs activos.</p>

    return (
        <div>
            <div>
                <h5 style={{ color: '#01662b' }}>
                    Ultimos movimientos de inventario
                </h5>
                <DividerMain />
            </div>

            <Table>
                <THead>
                    <Th className="text-center" style={{ width: '20%' }}>
                        Codigo
                    </Th>
                    <Th className="text-center" style={{ width: '40%' }}>
                        Descripción
                    </Th>
                    <Th className="text-center" style={{ width: '15%' }}>
                        Cantidad
                    </Th>
                    <Th className="text-center" style={{ width: '15%' }}>
                        Tipo de Mov.
                    </Th>
                </THead>
            </Table>
            <div className="table-body-container">
                <Table>
                    <TBody>
                        {logs.map((log) => {
                            return (
                                <tr key={log._id}>
                                    <Td
                                        className="text-center"
                                        style={{ width: '20%' }}
                                    >
                                        {log.Codigo}
                                    </Td>
                                    <Td
                                        className="text-center"
                                        style={{ width: '40%' }}
                                    >
                                        {log.Descripcion}
                                    </Td>
                                    <Td
                                        className="text-center"
                                        style={{ width: '15%' }}
                                    >
                                        {log.Cantidad} {log.Unidad}
                                    </Td>
                                    <Td
                                        className="text-center"
                                        style={{ width: '15%' }}
                                    >
                                        {log.TipoMov}
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

export default LogsList
