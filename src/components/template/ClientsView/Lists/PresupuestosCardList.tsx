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
}

const PresupuestosCardList: React.FC<PresupuestosCardListProps> = ({
    presupuestos,
    clientId,
}) => {
    return (
        <div className="presupuestos-container">
            <div className="table-responsive">
                <DividerMain />
                <Table className="table-auto w-full">
                    <THead>
                        <Th>Codigo</Th>
                        <Th>Total a Pagar</Th>
                        <Th>Total Pagado</Th>
                        <Th>Actualiz.</Th>
                        <Th>Extras</Th>
                        <Th>Saldo</Th>
                        <Th></Th>
                    </THead>
                    <TBody>
                        {presupuestos.map((presupuesto) => (
                            <PresupuestoRow
                                key={presupuesto.PresupuestoCodigo}
                                presupuesto={presupuesto}
                                clientId={clientId}
                            />
                        ))}
                    </TBody>
                </Table>
            </div>
        </div>
    )
}

export default PresupuestosCardList
