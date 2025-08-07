import React from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import { Parametro } from '@/@types/costos'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import '../../presupuestosViewStyles.css'

interface Props {
    parametros: Parametro[]
}

const ParametrosList: React.FC<Props> = ({ parametros }) => {
    return (
        <div>
            <h5 className="font-medium">Parámetros</h5>
            <Table>
                <THead>
                    <Th style={{ width: '50%' }}>Detalle</Th>
                    <Th className="text-center" style={{ width: '50%' }}>
                        Valor
                    </Th>
                </THead>
                <TBody>
                    {parametros.map((parametro, index) => (
                        <tr key={index}>
                            <Td style={{ width: '50%' }}>
                                {parametro.Detalle}
                            </Td>
                            <Td
                                className="text-center"
                                style={{ width: '50%' }}
                            >
                                {parametro.ValorCalculo}
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default ParametrosList
