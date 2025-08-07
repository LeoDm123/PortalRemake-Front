import React, { useState } from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import { Material } from '@/@types/costos'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import InfoButton from '@/components/template/infoButton'
import '../../presupuestosViewStyles.css'
import formatCurrency from '@/utils/hooks/formatCurrency'
import EditButton from '@/components/template/EditButton'
import EditMatsModal from '../../Modal/EditMatsModal'
import DividerMain from '@/components/template/DividerMain'

interface Props {
    materiales: Material[]
    onSubmit: () => void
}

export function calcularCostoUnitario(material: Material): number {
    if (
        material.Consumo.unidad === 'lts' ||
        material.Consumo.unidad === 'kg' ||
        material.Consumo.unidad === 'mLts'
    ) {
        return material.Costo / material.Volumen
    }

    if (
        material.Categoria === 'Madera' &&
        material.Consumo.unidad === 'pie2/ml'
    ) {
        return material.Costo * material.Volumen
    }

    if (material.Consumo.unidad === 'ml') {
        return material.Costo / material.Alto
    }

    if (material.Consumo.unidad === 'm2') {
        return material.Costo / (material.Ancho * material.Alto)
    }

    if (material.Consumo.unidad === 'u') {
        return material.Costo / material.Unidades
    }

    return material.Costo
}

const MaterialesList: React.FC<Props> = ({ materiales, onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
        null,
    )

    const toggleSettingsModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleSubmit = () => {
        toggleSettingsModal()
        onSubmit()
    }

    return (
        <div>
            <div>
                <h4 className="font-medium mt-5 ">Materiales</h4>
                <DividerMain />
            </div>
            <Table>
                <THead>
                    <Th style={{ width: '20%' }}>Detalle</Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Categoría
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Ancho
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Alto
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Espesor
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Volumen
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Unidad
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Unidades
                    </Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Consumo
                        <InfoButton title="Consumo del material en la fabricación" />
                    </Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Costo
                    </Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Costo/Unidad
                    </Th>
                    <Th className="text-center" style={{ width: '10%' }}></Th>
                </THead>
                <TBody>
                    {materiales.map((material, index) => (
                        <tr key={index}>
                            <Td style={{ width: '20%' }}>{material.Detalle}</Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {material.Categoria}
                            </Td>
                            <Td className="text-center" style={{ width: '7%' }}>
                                {material.Ancho || '-'}
                            </Td>
                            <Td className="text-center" style={{ width: '7%' }}>
                                {material.Alto || '-'}
                            </Td>
                            <Td className="text-center" style={{ width: '7%' }}>
                                {material.Espesor || '-'}
                            </Td>
                            <Td className="text-center" style={{ width: '7%' }}>
                                {material.Volumen || '-'}
                            </Td>
                            <Td className="text-center" style={{ width: '7%' }}>
                                {material.Unidad}
                            </Td>
                            <Td className="text-center" style={{ width: '7%' }}>
                                {material.Unidades || '-'}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {material.Consumo?.valor ?? '-'}{' '}
                                {material.Consumo?.unidad ?? ''}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {formatCurrency(material.Costo)}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {formatCurrency(
                                    calcularCostoUnitario(material),
                                )}
                            </Td>
                            <Td style={{ width: '10%' }}>
                                <EditButton
                                    size="small"
                                    isOpen={() => {
                                        setSelectedMaterial(material)
                                        toggleSettingsModal()
                                    }}
                                />
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
            {selectedMaterial && (
                <EditMatsModal
                    material={selectedMaterial}
                    isOpen={isModalOpen}
                    toggleModal={toggleSettingsModal}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}

export default MaterialesList
