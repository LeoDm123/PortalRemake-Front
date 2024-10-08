import React from 'react'
import '../clientViewStyles.css'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import PresupuestoRow from './PresupuestoRow'
import DividerMain from '../../DividerMain'
import { Presupuesto } from '@/@types/clientInfo'

type PresupuestosCardListProps = {
    presupuestos: Presupuesto[]
    clientId: string
    onDelete: () => void
}

const PresupuestosCardList: React.FC<PresupuestosCardListProps> = ({
    presupuestos,
    clientId,
    onDelete,
}) => {
    return (
        <div className="presupuestos-container">
            <div className="table-responsive">
                <DividerMain />
                {presupuestos.length > 0 ? (
                    <Table className="table-auto w-full">
                        <THead>
                            <Th className="pt-1">Codigo</Th>
                            <Th className="pt-1">Total a Pagar</Th>
                            <Th className="pt-1">Actualiz.</Th>
                            <Th className="pt-1">Extras</Th>
                            <Th className="pt-1">Total Pagado</Th>
                            <Th className="pt-1">Saldo</Th>
                            <Th className="pt-1"></Th>
                        </THead>
                        <TBody>
                            {presupuestos.map((presupuesto) => (
                                <PresupuestoRow
                                    key={presupuesto.PresupuestoCodigo}
                                    presupuesto={presupuesto}
                                    clientId={clientId}
                                    onDelete={onDelete}
                                />
                            ))}
                        </TBody>
                    </Table>
                ) : (
                    <p>El cliente no tiene presupuestos asociados</p>
                )}
            </div>
        </div>
    )
}

export default PresupuestosCardList
