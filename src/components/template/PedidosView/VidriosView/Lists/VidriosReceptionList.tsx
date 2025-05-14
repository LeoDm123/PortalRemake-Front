import React from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Recepcion } from '@/@types/pedidos'
import { formatFecha } from '@/utils/hooks/formatFecha'

type VidriosReceptionListProps = {
    recepciones: Recepcion[]
}

const VidriosReceptionList: React.FC<VidriosReceptionListProps> = ({
    recepciones,
}) => {
    return (
        <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <THead>
                <Th className="text-center">Fecha Recepción</Th>
                <Th className="text-center">Cantidad Recibida</Th>
                <Th className="text-center">Número de Remito</Th>
            </THead>
            <TBody>
                {recepciones.map((recepcion, index) => (
                    <tr key={index}>
                        <Td className="text-center">
                            {formatFecha(recepcion.FechaRecep)}
                        </Td>
                        <Td className="text-center">
                            {recepcion.CantRecibida.toFixed(2)}
                        </Td>
                        <Td className="text-center">{recepcion.NroRemito}</Td>
                    </tr>
                ))}
            </TBody>
        </Table>
    )
}

export default VidriosReceptionList
