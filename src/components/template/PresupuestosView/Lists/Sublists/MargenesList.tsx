import React from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import { Margenes } from '@/@types/costos'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import '../../presupuestosViewStyles.css'

interface Props {
    margenes: Margenes
}

const MargenesList: React.FC<Props> = ({ margenes }) => {
    // Si quieres omitir __v, puedes filtrar aquí
    const entries = Object.entries(margenes).filter(([key]) => key !== '__v')

    return (
        <div>
            <h5 className="font-medium">Margenes</h5>
            <Table>
                <THead>
                    <Th className="text-center" style={{ width: '50%' }}>
                        Detalle
                    </Th>
                    <Th className="text-center" style={{ width: '50%' }}>
                        Valor
                    </Th>
                </THead>
                <TBody>
                    {entries.map(([key, value]) => (
                        <tr key={key}>
                            <Td
                                className="text-center"
                                style={{ width: '50%' }}
                            >
                                {key}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '50%' }}
                            >
                                {value * 100}%
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default MargenesList
