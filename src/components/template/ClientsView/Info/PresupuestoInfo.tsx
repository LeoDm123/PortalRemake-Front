import React from 'react'
import { Box, Divider } from '@mui/material'
import formatCurrency from '@/utils/hooks/formatCurrency'
import { Presupuesto } from '@/@types/clientInfo'

type PresupuestoInfoProps = {
    presupuesto: Presupuesto
}

const PresupuestoInfo: React.FC<PresupuestoInfoProps> = ({ presupuesto }) => {
    return (
        <Box mb={4}>
            <div className="flex">
                <div className="w-4/12">
                    <p className="pb-1">
                        <strong>Código del Presupuesto:</strong>{' '}
                        {presupuesto.PresupuestoCodigo}
                    </p>
                    <p className="pb-1">
                        <strong>Cond. Facturación:</strong>{' '}
                        {presupuesto.CondicionFacturacion}%
                    </p>
                    <p>
                        <strong>Estado:</strong> {presupuesto.Estado}
                    </p>
                </div>
                <div className="w-3/12">
                    <div className="flex justify-between pb-1">
                        <p>
                            <strong>Precio:</strong>{' '}
                        </p>
                        <p>{formatCurrency(presupuesto.Precio)}</p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <p>
                            <strong>IVA:</strong>{' '}
                        </p>
                        <p>{formatCurrency(presupuesto.IVA)}</p>
                    </div>
                    <Divider
                        style={{
                            borderColor: '#01662b',
                        }}
                    />
                    <div className="flex justify-between pt-1">
                        <p>
                            <strong>Total:</strong>{' '}
                        </p>
                        <p>{formatCurrency(presupuesto.Total)}</p>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default PresupuestoInfo
