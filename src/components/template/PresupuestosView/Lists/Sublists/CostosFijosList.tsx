import React from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import { CostoFijo } from '@/@types/costos'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import '../../presupuestosViewStyles.css'
import formatCurrency from '@/utils/hooks/formatCurrency'

interface Props {
    costosFijos: CostoFijo[]
}

const CostosFijosList: React.FC<Props> = ({ costosFijos }) => {
    return (
        <div>
            <h5 className="font-medium">Costos Fijos</h5>
            <Table>
                <THead>
                    <Th className="text-center" style={{ width: '40%' }}>
                        Detalle
                    </Th>
                    <Th className="text-center" style={{ width: '30%' }}>
                        Cobro
                    </Th>
                    <Th className="text-center" style={{ width: '30%' }}>
                        Costo
                    </Th>
                </THead>
                <TBody>
                    {costosFijos.map((item, index) => (
                        <tr key={index}>
                            <Td
                                className="text-center"
                                style={{ width: '40%' }}
                            >
                                {item.Detalle}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '30%' }}
                            >
                                {item.Cobro}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '30%' }}
                            >
                                {formatCurrency(item.Costo)}
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default CostosFijosList
