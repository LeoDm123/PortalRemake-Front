import React from 'react'
import Table from '@/components/ui/Table/Table'
import { Presupuesto } from '@/@types/presupuesto'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import formatCurrency from '@/utils/hooks/formatCurrency'
import PuertaDetailsModal from '../Dropdown/PuertaDetailsModal'

interface PuertasInfoListProps {
    presupuesto: Presupuesto
}

const PuertasInfoList: React.FC<PuertasInfoListProps> = ({ presupuesto }) => {
    return (
        <div className="w-full h-dvh overflow-y-auto">
            <Table>
                <THead>
                    <Th className="text-center">Nombre</Th>
                    <Th className="text-center">Dimensiones</Th>
                    <Th className="text-center">Cantidad</Th>
                    <Th className="text-center">Marco</Th>
                    <Th className="text-center">Hoja</Th>
                    <Th className="text-center">Terminación</Th>
                    <Th className="text-center">Aplique</Th>
                    <Th className="text-center">Vidrio</Th>
                    <Th className="text-center">Paño Fijo</Th>
                    <Th className="text-center">Precio Unit.</Th>
                    <Th className="text-center" style={{ width: '1%' }}></Th>
                </THead>
                <TBody>
                    {presupuesto.Puertas.map((puerta) => (
                        <tr key={puerta._id}>
                            <Td className="text-center">{puerta.Nombre}</Td>
                            <Td className="text-center">{`${puerta.Ancho} x ${puerta.Alto} mm`}</Td>
                            <Td className="text-center">{puerta.Cantidad}</Td>
                            <Td className="text-center">{puerta.Marco}</Td>
                            <Td className="text-center">{puerta.Hoja}</Td>
                            <Td className="text-center">
                                {puerta.Terminacion || '-'}
                            </Td>
                            <Td className="text-center">
                                {puerta.Apliques || '-'}
                            </Td>
                            <Td className="text-center">
                                {puerta.Vidrio.Codigo !== '' ? (
                                    <div>
                                        <p>Tipo: {puerta.Vidrio.Detalle}</p>
                                        <p>
                                            Dimensiones: {puerta.Vidrio.Ancho} x{' '}
                                            {puerta.Vidrio.Alto} mm
                                        </p>
                                        <p>
                                            Cantidad: {puerta.Vidrio.Cantidad}
                                        </p>
                                    </div>
                                ) : (
                                    '-'
                                )}
                            </Td>
                            <Td className="text-center">
                                {puerta.PañoFijo &&
                                puerta.PañoFijo.length > 0 ? (
                                    <div>
                                        {puerta.PañoFijo.map((paño, idx) => (
                                            <div
                                                key={idx}
                                                className="mb-2 last:mb-0"
                                            >
                                                <p>Posición: {paño.Posicion}</p>
                                                <p>
                                                    Dimensiones: {paño.Ancho} x{' '}
                                                    {paño.Alto} mm
                                                </p>
                                                <p>Vidrio: {paño.Vidrio}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    '-'
                                )}
                            </Td>
                            <Td className="text-center">
                                {puerta.Precios && puerta.Precios.length > 0
                                    ? (() => {
                                          const totalPrecio =
                                              puerta.Precios.find(
                                                  (p) => p.Detalle === 'Total',
                                              )
                                          return totalPrecio
                                              ? formatCurrency(
                                                    totalPrecio.Precio,
                                                )
                                              : '-'
                                      })()
                                    : '-'}
                            </Td>
                            <Td className="text-center">
                                <PuertaDetailsModal puerta={puerta} />
                            </Td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default PuertasInfoList
