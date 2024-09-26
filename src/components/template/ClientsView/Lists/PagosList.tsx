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
import { Notification } from '@/components/ui'

type PagosListProps = {
    pagos: Pago[]
    clientId: string
    presupuestoId: string
}

const PagosList: React.FC<PagosListProps> = ({
    pagos,
    clientId,
    presupuestoId,
}) => {
    const [showNotification, setShowNotification] = useState(false)
    const [showSuccessNotification, setShowSuccessNotification] =
        useState(false)
    const [selectedPagoId, setSelectedPagoId] = useState<string | null>(null)

    const handleDelete = async () => {
        if (!selectedPagoId) return

        try {
            const success = await deletePayment(
                clientId,
                presupuestoId,
                selectedPagoId,
            )
            if (success) {
                console.log('Pago eliminado correctamente')
                setShowSuccessNotification(true)
            }
        } catch (error) {
            console.error('Error al eliminar el pago:', error)
        } finally {
            setShowNotification(false)
        }
    }

    const handleConfirmDelete = (pagoId: string) => {
        setSelectedPagoId(pagoId)
        setShowNotification(true)
    }

    const handleCloseNotification = () => {
        setShowNotification(false)
        setSelectedPagoId(null)
    }

    const handleCloseSuccessNotification = () => {
        setShowSuccessNotification(false)
    }

    return (
        <>
            <h5 className="mb-1" style={{ color: '#01662b' }}>
                Pagos Realizados
            </h5>
            {pagos.length > 0 ? (
                <Table>
                    <THead>
                        <Th>Concepto</Th>
                        <Th>Monto</Th>
                        <Th>Fecha</Th>
                        <Th>Comprobante</Th>
                        <Th>Comentarios</Th>
                        <Th className="w-1/12"></Th>
                    </THead>
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
                                    {pago.FechaPago}
                                </Td>
                                <Td className="text-center no-wrap w-2/12">
                                    {pago.PagoComprobante}
                                </Td>
                                <Td className="text-center no-wrap w-2/12">
                                    {pago.Comentarios}
                                </Td>
                                <Td className="text-center no-wrap">
                                    <DeleteButton
                                        onDelete={() =>
                                            handleConfirmDelete(pago._id)
                                        }
                                    />
                                </Td>
                            </tr>
                        ))}
                    </TBody>
                </Table>
            ) : (
                <p>No hay pagos realizados.</p>
            )}

            {showNotification && (
                <Notification
                    type="danger"
                    title="Confirmar eliminación"
                    centered={true}
                    duration={30000}
                    onClose={handleCloseNotification}
                >
                    <p>¿Estás seguro de que deseas eliminar este pago?</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="mr-2 px-4 py-2 bg-red-600 text-white rounded"
                            onClick={handleDelete}
                        >
                            Sí, eliminar
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded"
                            onClick={handleCloseNotification}
                        >
                            Cancelar
                        </button>
                    </div>
                </Notification>
            )}

            {showSuccessNotification && (
                <Notification
                    type="success"
                    title="Éxito"
                    closable
                    onClose={handleCloseSuccessNotification}
                >
                    El pago ha sido eliminado correctamente.
                </Notification>
            )}
        </>
    )
}

export default PagosList
