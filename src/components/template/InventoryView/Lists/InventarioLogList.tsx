import React, { useEffect, useState } from 'react'
import { Button, Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { HiXMark, HiArrowUp, HiArrowDown } from 'react-icons/hi2'
import { deleteInventarioLog, fetchInventarioLogs } from '@/api/api'
import DeleteButton from '../../DeleteButton'
import Swal from 'sweetalert2'

type InventarioLogListProps = {
    onClose: () => void
    searchTerm: string
    onDelete: () => void
}

const InventarioLogList: React.FC<InventarioLogListProps> = ({
    onClose,
    searchTerm,
    onDelete,
}) => {
    const [logs, setLogs] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInventarioLogs()
                setLogs(data)
            } catch (error) {
                console.error('Error al cargar los logs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleDelete = async (logId: string) => {
        if (!logId) return

        try {
            const success = await deleteInventarioLog(logId)
            if (success) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El movimiento ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                onDelete()
            }
        } catch (error) {
            console.error('Error al eliminar el movimiento:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el movimiento.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleConfirmDelete = (logId: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este movimiento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(logId)
            }
        })
    }

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const filteredAndSortedLogs = logs
        .filter((log) => {
            const searchLower = searchTerm.toLowerCase()
            return (
                log.Codigo?.toLowerCase().includes(searchLower) ||
                log.Descripcion?.toLowerCase().includes(searchLower) ||
                log.TipoMov?.toLowerCase().includes(searchLower) ||
                log.NroPedido?.toString().includes(searchLower) ||
                log.Comentario?.toLowerCase().includes(searchLower)
            )
        })
        .sort((a, b) => {
            const dateA = new Date(a.Fecha).getTime()
            const dateB = new Date(b.Fecha).getTime()
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })

    return (
        <div>
            <div className="overflow-auto max-h-[650px] custom-scroll">
                <Table style={{ padding: 0 }}>
                    <THead>
                        <Th className="cursor-pointer" onClick={handleSort}>
                            Fecha{' '}
                            {sortOrder === 'asc' ? (
                                <HiArrowUp className="inline ml-1" />
                            ) : (
                                <HiArrowDown className="inline ml-1" />
                            )}
                        </Th>
                        <Th>Código</Th>
                        <Th>Descripción</Th>
                        <Th>Cantidad</Th>
                        <Th>Unidad</Th>
                        <Th>Tipo de Movimiento</Th>
                        <Th>N° de Pedido</Th>
                        <Th>Comentario</Th>
                        <Th></Th>
                    </THead>
                    <TBody>
                        {filteredAndSortedLogs.length > 0 ? (
                            filteredAndSortedLogs.map((log, index) => (
                                <tr key={index}>
                                    <Td
                                        style={{ width: '10%' }}
                                        className="text-center"
                                    >
                                        {log.Fecha}
                                    </Td>
                                    <Td className="text-center">
                                        {log.Codigo}
                                    </Td>
                                    <Td>{log.Descripcion}</Td>
                                    <Td className="text-center">
                                        {log.Cantidad}
                                    </Td>
                                    <Td className="text-center">
                                        {log.Unidad}
                                    </Td>
                                    <Td className="text-center">
                                        {log.TipoMov}
                                    </Td>
                                    <Td
                                        style={{ width: '10%' }}
                                        className="text-center"
                                    >
                                        {log.NroPedido}
                                    </Td>
                                    <Td>{log.Comentario}</Td>
                                    <Td>
                                        <DeleteButton
                                            size="small"
                                            onDelete={() =>
                                                handleConfirmDelete(log._id)
                                            }
                                        />
                                    </Td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <Td colSpan={8} className="text-center">
                                    {loading
                                        ? 'Cargando movimientos...'
                                        : 'No hay movimientos registrados.'}
                                </Td>
                            </tr>
                        )}
                    </TBody>
                </Table>
            </div>
        </div>
    )
}

export default InventarioLogList
