import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Material } from '@/@types/pedidos'
import PedidoDetailsButton from '../../Buttons/PedidoDetailsButton'
import PedidoHerrajesInfoModal from '../Modal/PedidoHerrajesInfoModal'
import RecibirMaterialButton from '../../Buttons/RecibirMaterialButton'
import RecibirMaterialModal from '../Modal/RecibirMaterialModal'
import { updateEstadoHerrajes } from '@/api/api'
import '../../pedidosViewStyles.css'

interface HerrajesNestedListProps {
    materiales: Material[]
    pedidoId: string
    onReceptionComplete: () => void
}

const HerrajesNestedList: React.FC<HerrajesNestedListProps> = ({
    materiales,
    pedidoId,
    onReceptionComplete,
}) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
        null,
    )
    const [isMatModalOpen, setMatModalOpen] = useState(false)

    const formatNumber = (number: number) => {
        const parsedNumber = Number(number)
        return isNaN(parsedNumber) ? String(number) : parsedNumber.toFixed(2)
    }

    const toggleInfoModal = (material: Material | null = null) => {
        setSelectedMaterial(material)
        setIsInfoModalOpen(!isInfoModalOpen)
    }

    const toggleMatModal = (material: Material | null = null) => {
        setSelectedMaterial(material)
        setMatModalOpen(!isMatModalOpen)
    }

    useEffect(() => {
        const allComplete = materiales.every((material) => {
            const cantRecibida = material.Recepciones
                ? material.Recepciones.reduce(
                      (recepcionTotal, recepcion) =>
                          recepcionTotal + Number(recepcion.CantRecibida),
                      0,
                  )
                : 0
            return cantRecibida >= material.CantEntrega
        })

        if (allComplete) {
            updateEstadoHerrajes(pedidoId, 'Cerrado')
                .then(() => {
                    console.log(`Pedido ${pedidoId} actualizado a Cerrado`)
                    onReceptionComplete()
                })
                .catch((error) => {
                    console.error('Error al cerrar el pedido:', error)
                })
        }
    }, [materiales, pedidoId, onReceptionComplete])

    return (
        <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <THead>
                <Th className="text-center" style={{ width: '15%' }}>
                    Código
                </Th>
                <Th className="text-center" style={{ width: '45%' }}>
                    Descripción
                </Th>
                <Th className="text-center" style={{ width: '10%' }}>
                    Cant. Pedida
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
                {materiales.map((material, index) => {
                    const cantRecibida = material.Recepciones
                        ? material.Recepciones.reduce(
                              (recepcionTotal, recepcion) =>
                                  recepcionTotal +
                                  Number(recepcion.CantRecibida),
                              0,
                          )
                        : 0

                    const cantEntrega = material.CantEntrega

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
                                    {material.Codigo}
                                </Td>
                                <Td
                                    style={{
                                        width: '45%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    title={material.Descripcion}
                                >
                                    {material.Descripcion}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {formatNumber(material.CantEntrega)}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {formatNumber(cantRecibida)}
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
                                            toggleMatModal(material)
                                        }
                                    />
                                    <PedidoDetailsButton
                                        size="small"
                                        pedidoInfo={() =>
                                            toggleInfoModal(material)
                                        }
                                    />
                                </Td>
                            </tr>

                            {selectedMaterial && (
                                <PedidoHerrajesInfoModal
                                    isOpen={isInfoModalOpen}
                                    toggleModal={() => toggleInfoModal(null)}
                                    material={selectedMaterial}
                                />
                            )}

                            {selectedMaterial && (
                                <RecibirMaterialModal
                                    isOpen={isMatModalOpen}
                                    toggleModal={() => toggleMatModal(null)}
                                    material={selectedMaterial}
                                    pedidoId={pedidoId}
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

export default HerrajesNestedList
