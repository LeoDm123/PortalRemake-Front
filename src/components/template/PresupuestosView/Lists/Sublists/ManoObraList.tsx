import React from 'react'
import Table from '@/components/ui/Table/Table'
import THead from '@/components/ui/Table/THead'
import { ManoObra } from '@/@types/costos'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import '../../presupuestosViewStyles.css'
import formatCurrency from '@/utils/hooks/formatCurrency'

interface Props {
    manoObra: ManoObra
}

const ManoObraList: React.FC<Props> = ({ manoObra }) => {
    return (
        <div>
            <h5 className="font-medium">Mano de Obra</h5>
            <Table>
                <THead>
                    <Th className="text-center" style={{ width: '50%' }}>
                        Costo
                    </Th>
                    <Th className="text-center" style={{ width: '50%' }}>
                        Periodo
                    </Th>
                </THead>
                <TBody>
                    <Td className="text-center" style={{ width: '50%' }}>
                        {formatCurrency(manoObra.Costo)}
                    </Td>
                    <Td className="text-center" style={{ width: '50%' }}>
                        {manoObra.Fecha}
                    </Td>
                </TBody>
            </Table>
        </div>
    )
}

export default ManoObraList
