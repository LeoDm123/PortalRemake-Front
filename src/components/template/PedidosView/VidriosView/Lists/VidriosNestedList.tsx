import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Vidrio } from '@/@types/pedidos'
import PedidoDetailsButton from '../../Buttons/PedidoDetailsButton'
import PedidoVidriosInfoModal from '../Modal/PedidoVidriosInfoModal'
import RecibirMaterialButton from '../../Buttons/RecibirMaterialButton'
import RecibirVidrioModal from '../Modal/RecibirVidrioModal'
import { updateEstadoVidrios } from '@/api/api'
import '../../pedidosViewStyles.css'

interface VidriosNestedListProps {
    vidrios: Vidrio[]
    pedidoId: string
    nroPedido: string
    status: string
    onReceptionComplete: () => void
}

const VidriosNestedList: React.FC<VidriosNestedListProps> = ({
    vidrios,
    pedidoId,
    nroPedido,
    status,
    onReceptionComplete,
}) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [selectedVidrio, setSelectedVidrio] = useState<Vidrio | null>(null)
    const [isMatModalOpen, setMatModalOpen] = useState(false)

    const toggleInfoModal = (vidrio: Vidrio | null = null) => {
        setSelectedVidrio(vidrio)
        setIsInfoModalOpen(!isInfoModalOpen)
    }

    const toggleMatModal = (vidrio: Vidrio | null = null) => {
        setSelectedVidrio(vidrio)
        setMatModalOpen(!isMatModalOpen)
    }

    useEffect(() => {
        if (status === 'Abierto') {
            const allComplete = vidrios.every((vidrio) => {
                const cantRecibida = vidrio.Recepciones
                    ? vidrio.Recepciones.reduce(
                          (recepcionTotal, recepcion) =>
                              recepcionTotal + Number(recepcion.CantRecibida),
                          0,
                      )
                    : 0
                return cantRecibida >= vidrio.Cantidad
            })

            if (allComplete) {
                updateEstadoVidrios(pedidoId, 'Cerrado')
                    .then(() => {
                        console.log(`Pedido ${pedidoId} actualizado a Cerrado`)
                        onReceptionComplete()
                    })
                    .catch((error) => {
                        console.error('Error al cerrar el pedido:', error)
                    })
            }
        }
    }, [vidrios, pedidoId, onReceptionComplete, status])

    return (
        <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <THead>
                <Th className="text-center" style={{ width: '10%' }}>
                    Tipología
                </Th>
                <Th className="text-center" style={{ width: '10%' }}>
                    Ancho
                </Th>
                <Th className="text-center" style={{ width: '10%' }}>
                    Alto
                </Th>
                <Th className="text-center" style={{ width: '12%' }}>
                    Composición
                </Th>
                <Th className="text-center" style={{ width: '10%' }}>
                    Cant. a Recibir
                </Th>
                <Th className="text-center" style={{ width: '10%' }}>
                    Cant. Recibida
                </Th>
                <Th className="text-center" style={{ width: '15%' }}>
                    Estado
                </Th>
                <Th style={{ width: '5%', padding: 0 }}></Th>
            </THead>
            <TBody>
                {vidrios.map((vidrio, index) => {
                    const cantRecibida = vidrio.Recepciones
                        ? vidrio.Recepciones.reduce(
                              (recepcionTotal, recepcion) =>
                                  recepcionTotal +
                                  Number(recepcion.CantRecibida),
                              0,
                          )
                        : 0

                    const cantEntrega = vidrio.Cantidad

                    const estado =
                        cantRecibida === 0
                            ? 'En tránsito'
                            : cantRecibida < cantEntrega
                              ? 'Incompleto'
                              : cantRecibida === cantEntrega
                                ? 'Completo'
                                : 'Excedido'

                    return (
                        <React.Fragment key={index}>
                            <tr>
                                <Td
                                    className="text-center"
                                    style={{ width: '15%' }}
                                >
                                    {vidrio.Tipologia}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {vidrio.Ancho} mm.
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {vidrio.Alto} mm.
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {vidrio.Composicion}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {vidrio.Cantidad} u.
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {cantRecibida} u.
                                </Td>
                                <Td
                                    style={{ width: '15%' }}
                                    className={`text-center no-wrap w-2/12 ${
                                        {
                                            Excedido: 'text-yellow-500',
                                            Completo: 'text-green-500',
                                            Incompleto: 'text-red-500',
                                            'En tránsito': 'text-gray-500',
                                        }[estado]
                                    }`}
                                >
                                    {estado}
                                </Td>
                                <Td style={{ width: '5%', padding: 0 }}>
                                    <RecibirMaterialButton
                                        size="small"
                                        recibirMat={() =>
                                            toggleMatModal(vidrio)
                                        }
                                    />
                                    <PedidoDetailsButton
                                        size="small"
                                        pedidoInfo={() =>
                                            toggleInfoModal(vidrio)
                                        }
                                    />
                                </Td>
                            </tr>

                            {selectedVidrio && (
                                <PedidoVidriosInfoModal
                                    isOpen={isInfoModalOpen}
                                    toggleModal={() => toggleInfoModal(null)}
                                    vidrio={selectedVidrio}
                                />
                            )}

                            {selectedVidrio && (
                                <RecibirVidrioModal
                                    isOpen={isMatModalOpen}
                                    toggleModal={() => toggleMatModal(null)}
                                    vidrio={selectedVidrio}
                                    pedidoId={pedidoId}
                                    nroPedido={nroPedido}
                                    onReceptionComplete={onReceptionComplete}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
            </TBody>
        </Table>
    )
}

export default VidriosNestedList
