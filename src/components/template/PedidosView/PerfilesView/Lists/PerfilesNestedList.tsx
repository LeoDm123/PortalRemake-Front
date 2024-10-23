import React, { useState } from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Material } from '@/@types/pedidos'
import PedidoDetailsButton from '../Buttons/PedidoDetailsButton'
import PedidoPerfilesInfoModal from '../Modal/PedidoPerfilesInfoModal'

interface PerfilesNestedListProps {
    materiales: Material[]
}

const PerfilesNestedList: React.FC<PerfilesNestedListProps> = ({
    materiales,
}) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
        null,
    )

    const formatNumber = (number: number) => {
        const parsedNumber = Number(number)
        return isNaN(parsedNumber) ? String(number) : parsedNumber.toFixed(2)
    }

    const toggleInfoModal = (material: Material | null = null) => {
        setSelectedMaterial(material)
        setIsInfoModalOpen(!isInfoModalOpen)
    }

    return (
        <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <THead>
                <Th className="text-center" style={{ width: '12%' }}>
                    Código
                </Th>
                <Th className="text-center" style={{ width: '50%' }}>
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
                                    style={{ width: '12%' }}
                                >
                                    {material.Codigo}
                                </Td>
                                <Td
                                    style={{
                                        width: '50%',
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
                                    {formatNumber(material.CantPedida)}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '10%' }}
                                >
                                    {formatNumber(cantRecibida)}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '15%' }}
                                >
                                    {estado}
                                </Td>
                                <Td style={{ width: '5%', padding: 0 }}>
                                    <PedidoDetailsButton
                                        size="small"
                                        pedidoInfo={() =>
                                            toggleInfoModal(material)
                                        }
                                    />
                                </Td>
                            </tr>

                            {selectedMaterial && (
                                <PedidoPerfilesInfoModal
                                    isOpen={isInfoModalOpen}
                                    toggleModal={() => toggleInfoModal(null)}
                                    material={selectedMaterial}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
            </TBody>
        </Table>
    )
}

export default PerfilesNestedList
