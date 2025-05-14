import React, { useState } from 'react'
import '../clientViewStyles.css'
import formatCurrency from '@/utils/hooks/formatCurrency'
import { Pago } from '@/@types/clientInfo'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import DeleteButton from '../../DeleteButton'
import { deletePayment } from '@/api/api'
import Swal from 'sweetalert2'
import '../clientViewStyles.css'
import DividerMain from '../../DividerMain'
import { formatFecha } from '@/utils/hooks/formatFecha'

type PagosListProps = {
    pagos: Pago[]
    clientId: string
    presupuestoId: string
    onDelete: () => void
}

const MAX_COMMENT_LENGTH = 50

const PagosList: React.FC<PagosListProps> = ({
    pagos,
    clientId,
    presupuestoId,
    onDelete,
}) => {
    const [expandedComments, setExpandedComments] = useState<{
        [key: string]: boolean
    }>({})

    const handleDelete = async (pagoId: string) => {
        if (!pagoId) return

        try {
            const success = await deletePayment(clientId, presupuestoId, pagoId)
            if (success) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El pago ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                onDelete()
            }
        } catch (error) {
            console.error('Error al eliminar el pago:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el pago.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleConfirmDelete = (pagoId: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este pago?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(pagoId)
            }
        })
    }

    const toggleComment = (pagoId: string) => {
        setExpandedComments((prev) => ({
            ...prev,
            [pagoId]: !prev[pagoId],
        }))
    }

    return (
        <>
            <h5 className="mb-1" style={{ color: '#01662b' }}>
                Pagos Realizados
            </h5>
            <DividerMain />
            {pagos.length > 0 ? (
                <div className="table-container">
                    <Table>
                        <THead>
                            <Th className="pt-1 w-2/12">Concepto</Th>
                            <Th className="pt-1 w-2/12">Monto</Th>
                            <Th className="pt-1 w-2/12">Fecha</Th>
                            <Th className="pt-1 w-2/12">Comprobante</Th>
                            <Th className="pt-1 w-3/12">Comentarios</Th>
                            <Th className=""></Th>
                        </THead>
                    </Table>

                    <div className="table-body-container">
                        <Table>
                            <TBody>
                                {pagos.map((pago, index) => (
                                    <tr key={index}>
                                        <Td className="text-center no-wrap w-2/12">
                                            {pago.PagoConcepto}
                                        </Td>
                                        <Td className="text-center no-wrap w-2/12">
                                            {formatCurrency(pago.PagoMonto)}
                                        </Td>
                                        <Td className="text-center no-wrap w-2/12">
                                            {formatFecha(pago.FechaPago)}
                                        </Td>
                                        <Td className="text-center no-wrap w-2/12">
                                            {pago.PagoComprobante}
                                        </Td>
                                        <Td
                                            className="text-center no-wrap w-3/12 fixed-width"
                                            style={{
                                                wordWrap: 'break-word',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {pago.Comentarios.length >
                                            MAX_COMMENT_LENGTH ? (
                                                <>
                                                    {expandedComments[pago._id]
                                                        ? pago.Comentarios
                                                        : `${pago.Comentarios.substring(0, MAX_COMMENT_LENGTH)}...`}
                                                    <button
                                                        onClick={() =>
                                                            toggleComment(
                                                                pago._id,
                                                            )
                                                        }
                                                        className="toggle-comment-btn"
                                                        style={{
                                                            color: '#01662b',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {expandedComments[
                                                            pago._id
                                                        ]
                                                            ? 'Mostrar menos'
                                                            : 'Mostrar más'}
                                                    </button>
                                                </>
                                            ) : (
                                                pago.Comentarios
                                            )}
                                        </Td>
                                        <Td className="text-center no-wrap">
                                            <DeleteButton
                                                size="small"
                                                onDelete={() =>
                                                    handleConfirmDelete(
                                                        pago._id,
                                                    )
                                                }
                                            />
                                        </Td>
                                    </tr>
                                ))}
                            </TBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <p>No hay pagos realizados.</p>
            )}
        </>
    )
}

export default PagosList
