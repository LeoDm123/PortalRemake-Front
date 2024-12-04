import React, { useState } from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { deletePedidoHerrajes } from '@/api/api'
import Swal from 'sweetalert2'
import '../../pedidosViewStyles.css'
import DeleteButton from '@/components/template/DeleteButton'
import { usePedidosHerrajes } from '@/utils/hooks/usePedidosHerrajes'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import { IconButton } from '@mui/material'
import HerrajesNestedList from './HerrajesNestedList'
import { Skeleton } from '@/components/ui'

const PedidosHerrajesList = () => {
    const { pedidos, loading, fetchPedidos } = usePedidosHerrajes()
    const [expandedPedidoId, setExpandedPedidoId] = useState<string | null>(
        null,
    )

    const toggleExpand = (pedidoId: string) => {
        setExpandedPedidoId((prev) => (prev === pedidoId ? null : pedidoId))
    }

    const isRowExpanded = (pedidoId: string) => expandedPedidoId === pedidoId

    const handleDelete = async (pedidoId: string) => {
        if (!pedidoId) return

        try {
            const success = await deletePedidoHerrajes(pedidoId)
            if (success) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El pedido ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                fetchPedidos()
            }
        } catch (error) {
            console.error('Error al eliminar el pedido:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el pedido.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleConfirmDelete = (pedidoId: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este pedido?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(pedidoId)
            }
        })
    }

    if (loading) {
        return (
            <div>
                {Array.from(new Array(10)).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={100}
                        style={{ marginBottom: '10px' }}
                    />
                ))}
            </div>
        )
    }

    return (
        <>
            {pedidos.length > 0 ? (
                <div className="table-container">
                    <Table>
                        <THead>
                            <Th className="pt-1 w-3/12">Obra</Th>
                            <Th className="pt-1 w-2/12">Fecha</Th>
                            <Th className="pt-1 w-2/12">N° de Pedido</Th>
                            <Th className="pt-1 w-2/12">N° Orden de Compra</Th>
                            <Th className="pt-1 w-2/12">Estado</Th>
                            <Th></Th>
                        </THead>
                    </Table>

                    <div className="table-body-container">
                        <Table>
                            <TBody>
                                {pedidos.map((pedido, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <Td className="no-wrap w-3/12 td-px">
                                                {pedido.Obra}
                                            </Td>
                                            <Td className="text-center no-wrap w-2/12 td-px">
                                                {pedido.Fecha}
                                            </Td>
                                            <Td className="text-center no-wrap w-2/12 td-px">
                                                {pedido.NroPedido}
                                            </Td>
                                            <Td className="text-center no-wrap w-2/12 td-status-px">
                                                {pedido.OrdenCompra}
                                            </Td>
                                            <Td
                                                className={`text-center no-wrap w-2/12 td-status-px ${
                                                    pedido.Estado === 'Cerrado'
                                                        ? 'text-red-500'
                                                        : 'text-green-500'
                                                }`}
                                            >
                                                {pedido.Estado}
                                            </Td>
                                            <Td className="m-0 text-center no-wrap td-px">
                                                <IconButton
                                                    onClick={() =>
                                                        toggleExpand(pedido._id)
                                                    }
                                                    size="small"
                                                >
                                                    {isRowExpanded(
                                                        pedido._id,
                                                    ) ? (
                                                        <HiOutlineChevronUp />
                                                    ) : (
                                                        <HiOutlineChevronDown />
                                                    )}
                                                </IconButton>

                                                <DeleteButton
                                                    size="small"
                                                    onDelete={() =>
                                                        handleConfirmDelete(
                                                            pedido._id,
                                                        )
                                                    }
                                                />
                                            </Td>
                                        </tr>
                                        {isRowExpanded(pedido._id) && (
                                            <tr>
                                                <Td
                                                    style={{ padding: 5 }}
                                                    colSpan={6}
                                                >
                                                    <div
                                                        className={`content-wrapper ${
                                                            isRowExpanded(
                                                                pedido._id,
                                                            )
                                                                ? 'expanded'
                                                                : 'collapsed'
                                                        }`}
                                                    >
                                                        <HerrajesNestedList
                                                            materiales={
                                                                pedido.Materiales
                                                            }
                                                            pedidoId={
                                                                pedido._id
                                                            }
                                                            onReceptionComplete={
                                                                fetchPedidos
                                                            }
                                                        />
                                                    </div>
                                                </Td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <p>No hay pedidos realizados.</p>
            )}
        </>
    )
}

export default PedidosHerrajesList