import React from 'react'
import { Puerta } from '@/@types/presupuesto'
import { Table } from '@/components/ui/Table'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import Tr from '@/components/ui/Table/Tr'
import { useDoorCost } from '@/utils/hooks/useDoorCost'
import formatCurrency from '@/utils/hooks/formatCurrency'
import '../../presupuestosViewStyles.css'
import EditButton from '@/components/template/EditButton'
import DeleteButton from '@/components/template/DeleteButton'

interface PuertasListProps {
    puertas: Puerta[]
    onEdit: (puerta: Puerta, index: number) => void
    onDelete: (index: number) => void
}

const PuertaRow: React.FC<{
    puerta: Puerta
    index: number
    onEdit: (puerta: Puerta, index: number) => void
    onDelete: (index: number) => void
}> = ({ puerta, index, onEdit, onDelete }) => {
    const { doorCost } = useDoorCost(puerta)

    if (!doorCost) return null

    return (
        <Tr>
            <Td align="left" style={{ width: '50%' }}>
                <div className="row">
                    <div className="col-12">
                        <div>
                            <strong>Dimensiones:</strong> {puerta.Ancho} x{' '}
                            {puerta.Alto} mm
                        </div>
                        <div>
                            <strong>Cantidad:</strong> {puerta.Cantidad}
                        </div>
                        <div>
                            <strong>Marco:</strong> {puerta.Marco}
                        </div>
                        <div>
                            <strong>Hoja:</strong> {puerta.Hoja}
                        </div>
                        <div>
                            <strong>Terminación:</strong> {puerta.Terminacion}
                        </div>
                        {puerta.Apliques && (
                            <div>
                                <strong>Aplique:</strong> {puerta.Apliques}
                            </div>
                        )}
                        {puerta.Vidrio.Detalle && (
                            <div>
                                <strong>Vidrio:</strong> {puerta.Vidrio.Detalle}{' '}
                                = {puerta.Vidrio.Ancho} x {puerta.Vidrio.Alto}{' '}
                                mm
                            </div>
                        )}
                        {puerta.PañoFijo.length > 0 && (
                            <div>
                                <strong>Paño Fijo:</strong>
                                {puerta.PañoFijo.map((PF, index) => (
                                    <span key={index}>
                                        {PF.Posicion}, {PF.Ancho} x {PF.Alto}{' '}
                                        mm, {PF.Vidrio}
                                        {index < puerta.PañoFijo.length - 1
                                            ? '; '
                                            : ''}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div>
                            <strong>Puerta Corrediza:</strong>{' '}
                            {puerta.Corrediza ? 'Si' : 'No'}
                        </div>
                        <div>
                            <strong>Sin colocación:</strong>{' '}
                            {puerta.SinColocacion ? 'Si' : 'No'}
                        </div>
                        <div>
                            <strong>Sin terminación:</strong>{' '}
                            {puerta.SinTerminacion ? 'Si' : 'No'}
                        </div>
                        <div>
                            <strong>Puerta principal:</strong>{' '}
                            {puerta.PuertaPrincipal ? 'Si' : 'No'}
                        </div>
                        <div>
                            <strong>Complejidad extra:</strong>{' '}
                            {puerta.ComplejidadExtra}%
                        </div>
                    </div>
                </div>
            </Td>
            <Td style={{ width: '50%' }}>
                <div className="costos-container">
                    <div className="costos-row">
                        <div className="costo-item">
                            <strong>Marco: </strong>
                            <span>{formatCurrency(doorCost.marcoCost)}</span>
                        </div>
                        <div className="costo-item">
                            <strong>Tapajuntas: </strong>
                            <span>{formatCurrency(doorCost.tapajuntas)}</span>
                        </div>
                        <div className="costo-item">
                            <strong>Hoja: </strong>
                            <span>{formatCurrency(doorCost.hojaCost)}</span>
                        </div>
                        <div className="costo-item">
                            <strong>Terminación : </strong>
                            <span>
                                {formatCurrency(doorCost.terminacionTotal)}
                            </span>
                        </div>
                    </div>
                    <div className="costos-row">
                        <div className="costo-item">
                            <strong>Fabricación: </strong>
                            <span>
                                {formatCurrency(doorCost.fabricacionTotal)}
                            </span>
                        </div>
                        <div className="costo-item">
                            <strong>Colocación Obra: </strong>
                            <span>{formatCurrency(doorCost.colocacion)}</span>
                        </div>
                        <div className="costo-item">
                            <strong>Aplique: </strong>
                            <span>{formatCurrency(doorCost.apliqueCost)}</span>
                        </div>
                        <div className="costo-item">
                            <strong>Vidrio: </strong>
                            <span>{formatCurrency(doorCost.vidrioCost)}</span>
                        </div>
                        <div className="costo-item">
                            <strong>Paño Fijo: </strong>
                            <span>{formatCurrency(doorCost.pañoFijoCost)}</span>
                        </div>
                    </div>
                    <div className="costos-total">
                        <strong>Total: </strong>
                        <span>{formatCurrency(doorCost.totalCost)}</span>
                    </div>
                </div>
            </Td>
            <Td style={{ width: '10%' }}>
                <EditButton
                    isOpen={() => onEdit(puerta, index)}
                    size="medium"
                />
                <DeleteButton onDelete={() => onDelete(index)} size="medium" />
            </Td>
        </Tr>
    )
}

const PuertasList: React.FC<PuertasListProps> = ({
    puertas,
    onEdit,
    onDelete,
}) => {
    if (puertas.length === 0) return null

    return (
        <div className="table-container">
            <Table>
                <THead>
                    <Th align="left" style={{ width: '50%' }}>
                        Detalle de la Puerta
                    </Th>
                    <Th align="left" style={{ width: '50%' }}>
                        Desgloce de Costos
                    </Th>
                    <Th align="left" style={{ width: '10%' }}></Th>
                </THead>
            </Table>
            <div className="table-body-container">
                <Table>
                    <TBody>
                        {puertas.map((puerta, idx) => (
                            <PuertaRow
                                key={puerta._id}
                                puerta={puerta}
                                index={idx}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </TBody>
                </Table>
            </div>
        </div>
    )
}

export default PuertasList
