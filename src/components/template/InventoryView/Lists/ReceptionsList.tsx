import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Skeleton } from '@/components/ui'
import '../inventarioViewStyles.css'
import formatNumber from '@/utils/hooks/formatNumber'
import { InventarioLog, Material } from '@/@types/mats'
import { useMateriales } from '@/utils/hooks/useMateriales'

type ReceptionsListProps = {
    receptions: InventarioLog[]
}

const ReceptionsList: React.FC<ReceptionsListProps> = ({ receptions }) => {
    const { loading } = useMateriales()
    console.log('Recepcions', receptions)

    if (loading) {
        return (
            <div>
                {Array.from(new Array(10)).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={100}
                        style={{ marginBottom: '10px' }}
                    />
                ))}
            </div>
        )
    }

    let stockTotal = 0

    return (
        <>
            {receptions.length > 0 ? (
                <div className="reception-list-container">
                    <Table>
                        <THead>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '10%' }}
                            >
                                Fecha
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '10%' }}
                            >
                                Cantidad
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '10%' }}
                            >
                                Unidad
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '10%' }}
                            >
                                Ingreso/Egreso
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '15%' }}
                            >
                                Nro. Pedido
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '15%' }}
                            >
                                Detalle
                            </Th>
                            <Th
                                className="pt-1 text-center"
                                style={{ width: '10%' }}
                            >
                                Stock
                            </Th>
                        </THead>
                    </Table>

                    <div className="reception-list">
                        <Table>
                            <TBody>
                                {receptions.map((reception, index) => {
                                    if (reception.TipoMov === 'Ingreso') {
                                        stockTotal += reception.CantRecibida
                                    } else if (reception.TipoMov === 'Egreso') {
                                        stockTotal -= reception.CantRecibida
                                    }

                                    return (
                                        <tr key={index}>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '10%' }}
                                            >
                                                {reception.FechaRecep}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '10%' }}
                                            >
                                                {reception.CantRecibida}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '10%' }}
                                            >
                                                {reception.Unidad}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '10%' }}
                                            >
                                                {reception.TipoMov}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '15%' }}
                                            >
                                                {reception.nroPedido}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '15%' }}
                                            >
                                                {reception.RemitoLog}
                                            </Td>
                                            <Td
                                                className="text-center no-wrap td-px"
                                                style={{ width: '10%' }}
                                            >
                                                {formatNumber(stockTotal)}{' '}
                                                {reception.Unidad}
                                            </Td>
                                        </tr>
                                    )
                                })}
                            </TBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <p>No hay recepciones disponibles.</p>
            )}
        </>
    )
}

export default ReceptionsList
