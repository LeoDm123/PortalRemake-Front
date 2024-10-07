import React from 'react'
import { Box, Divider } from '@mui/material'
import formatCurrency from '@/utils/hooks/formatCurrency'
import { Presupuesto } from '@/@types/clientInfo'
import {
    calculateTotalDiscounts,
    calculateTotalTaxes,
    calculateTotalPayments,
    calculateTotalUpdate,
    calculateTotalExtra,
    calculateDebt,
} from '@/utils/hooks/calculateDebt'

type PresupuestoInfoProps = {
    presupuesto: Presupuesto
}

const PresupuestoInfo: React.FC<PresupuestoInfoProps> = ({ presupuesto }) => {
    const calculateTotalDebt = (presupuesto: Presupuesto): number => {
        return (
            presupuesto.Total +
            calculateTotalUpdate(presupuesto) +
            calculateTotalExtra(presupuesto)
        )
    }

    return (
        <Box mb={4}>
            <div className="flex justify-between">
                <div className="w-3/12">
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
                        <p>Precio: </p>
                        <p>{formatCurrency(presupuesto.Precio)}</p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <p>IVA: </p>
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
                        <p>
                            <strong>{formatCurrency(presupuesto.Total)}</strong>
                        </p>
                    </div>
                </div>

                <div className="w-3/12 mr-20">
                    <div className="flex justify-between pb-1">
                        <p>Total Presupuesto: </p>
                        <p>{formatCurrency(presupuesto.Total)}</p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <p>Actualiz. + Extras: </p>
                        <p>
                            {formatCurrency(
                                calculateTotalUpdate(presupuesto) +
                                    calculateTotalExtra(presupuesto),
                            )}
                        </p>
                    </div>
                    <Divider
                        style={{
                            borderColor: '#01662b',
                        }}
                    />
                    <div className="flex justify-between py-1">
                        <p>
                            <strong>Total a Pagar:</strong>{' '}
                        </p>
                        <p>
                            <strong>
                                {formatCurrency(
                                    calculateTotalDebt(presupuesto),
                                )}
                            </strong>
                        </p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <p>Total Pagado: </p>
                        <p>
                            -
                            {formatCurrency(
                                calculateTotalPayments(presupuesto),
                            )}
                        </p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <p>Desc. + Retenc.: </p>
                        <p>
                            -
                            {formatCurrency(
                                calculateTotalDiscounts(presupuesto) +
                                    calculateTotalTaxes(presupuesto),
                            )}
                        </p>
                    </div>

                    <Divider
                        style={{
                            borderColor: '#01662b',
                        }}
                    />
                    <div className="flex justify-between pt-1">
                        <p>
                            <strong>Saldo Pendiente:</strong>{' '}
                        </p>
                        <p>
                            <strong>
                                {formatCurrency(calculateDebt(presupuesto))}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default PresupuestoInfo
