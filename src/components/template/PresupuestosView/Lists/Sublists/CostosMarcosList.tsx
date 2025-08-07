import React, { useState } from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { marcos } from '@/constants/presupuestos.constant'
import '../../presupuestosViewStyles.css'
import formatNumber from '@/utils/hooks/formatNumber'
import { costoMarco } from '@/utils/hooks/useCalculatedCosts'
import { useCostos } from '@/utils/hooks/useCostos'
import formatCurrency from '@/utils/hooks/formatCurrency'
import { Material } from '@/@types/costos'
import EditMarcosModal from '../../Modal/EditMarcosModal'
import DividerMain from '@/components/template/DividerMain'

interface Props {
    onSubmit: () => void
}

const CostosMarcosList: React.FC<Props> = ({ onSubmit }) => {
    const { variablesPredefinidas, margenes } = useCostos()
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
                <h4 className="font-medium mt-5 ">Marcos</h4>
                <DividerMain />
            </div>
            <Table>
                <THead>
                    <Th style={{ width: '20%' }}>Detalle</Th>

                    <Th className="text-center" style={{ width: '7%' }}>
                        m2 por ml
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Area Lustre [m2]
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Ancho [cm]
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        pies2 por ml
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        +% Marco cajón
                    </Th>
                    <Th className="text-center" style={{ width: '7%' }}>
                        Costo [$/ml]
                    </Th>

                    <Th className="text-center" style={{ width: '10%' }}></Th>
                </THead>
                <TBody>
                    {marcos.map((marco, index) => {
                        // Convertir ancho de cm a m²
                        const seccion = marco.anchoCm / 100
                        const adicional = marco.marcoCajon
                        const costo = costoMarco(
                            variablesPredefinidas,
                            margenes,
                            seccion,
                            adicional,
                        )

                        return (
                            <tr key={index}>
                                <Td style={{ width: '20%' }}>{marco.label}</Td>

                                <Td
                                    className="text-center"
                                    style={{ width: '7%' }}
                                >
                                    {formatNumber(marco.anchoCm / 100)}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '7%' }}
                                >
                                    {marco.areaDeLustreCm || '-'}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '7%' }}
                                >
                                    {marco.anchoCm || '-'}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '7%' }}
                                >
                                    {formatNumber(marco.pies2PorML)}
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '7%' }}
                                >
                                    {marco.marcoCajon * 100}%
                                </Td>
                                <Td
                                    className="text-center"
                                    style={{ width: '7%' }}
                                >
                                    {formatCurrency(costo.value)}
                                </Td>
                                <Td style={{ width: '10%' }}></Td>
                            </tr>
                        )
                    })}
                </TBody>
            </Table>
            {selectedMaterial && (
                <EditMarcosModal
                    material={selectedMaterial}
                    isOpen={isModalOpen}
                    toggleModal={toggleSettingsModal}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}

export default CostosMarcosList
