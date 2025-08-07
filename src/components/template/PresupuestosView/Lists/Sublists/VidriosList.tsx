import React, { useState } from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import { Material, Vidrios } from '@/@types/costos'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import InfoButton from '@/components/template/infoButton'
import '../../presupuestosViewStyles.css'
import formatCurrency from '@/utils/hooks/formatCurrency'
import EditButton from '@/components/template/EditButton'
import EditMatsModal from '../../Modal/EditMatsModal'
import DividerMain from '@/components/template/DividerMain'
import EditVidriosModal from '../../Modal/EditVidriosModal'

interface Props {
    vidrios: Vidrios[]
    onSubmit: () => void
}

const VidriosList: React.FC<Props> = ({ vidrios, onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<Vidrios | null>(
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
                <h4 className="font-medium mt-5 ">Vidrios</h4>
                <DividerMain />
            </div>
            <Table>
                <THead>
                    <Th style={{ width: '40%' }}>Detalle</Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Código
                    </Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Costo
                    </Th>
                    <Th className="text-center" style={{ width: '10%' }}>
                        Unidad
                    </Th>

                    <Th className="text-center" style={{ width: '10%' }}></Th>
                </THead>
                <TBody>
                    {vidrios.map((vidrio, index) => (
                        <tr key={index}>
                            <Td style={{ width: '40%' }}>{vidrio.Detalle}</Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {vidrio.Codigo}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {formatCurrency(vidrio.Costo) || '-'}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '10%' }}
                            >
                                {vidrio.Unidad || '-'}
                            </Td>

                            <Td style={{ width: '10%' }}>
                                <EditButton
                                    size="small"
                                    isOpen={() => {
                                        setSelectedMaterial(vidrio)
                                        toggleSettingsModal()
                                    }}
                                />
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
            {selectedMaterial && (
                <EditVidriosModal
                    vidrio={selectedMaterial}
                    isOpen={isModalOpen}
                    toggleModal={toggleSettingsModal}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}

export default VidriosList
