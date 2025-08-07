import React from 'react'
import { Box, Divider } from '@mui/material'
import { Presupuesto } from '@/@types/presupuesto'
import PuertasInfoList from './PuertasInfoList'
import formatCurrency from '@/utils/hooks/formatCurrency'

interface PresPuertaInfoListProps {
    presupuesto: Presupuesto
}

const PresPuertaInfoList: React.FC<PresPuertaInfoListProps> = ({
    presupuesto,
}) => {
    return (
        <Box
            mb={4}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className="flex justify-between">
                <div className="w-3/12">
                    <p className="pb-1">
                        <strong>Cliente:</strong> {presupuesto.Cliente}
                    </p>
                    <p className="pb-1">
                        <strong>Obra:</strong> {presupuesto.Obra}
                    </p>
                    <p className="pb-1">
                        <strong>Código:</strong> {presupuesto.Codigo}
                    </p>
                    <p>
                        <strong>Estado:</strong>{' '}
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                presupuesto.Status === 'Pendiente'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : presupuesto.Status === 'Aprobado'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {presupuesto.Status}
                        </span>
                    </p>
                </div>

                <div className="w-3/12">
                    <div className="flex justify-between pb-1">
                        <p>Precio s/Desc.: </p>
                        <p>{formatCurrency(presupuesto.Precio)}</p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <div className="flex">
                            <p>Descuento</p>
                            <p className="p-0">({presupuesto.Descuento}%): </p>
                        </div>
                        <p>
                            -
                            {formatCurrency(
                                presupuesto.Precio *
                                    (presupuesto.Descuento / 100),
                            )}
                        </p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <p>Precio c/Desc.: </p>
                        <p>
                            {formatCurrency(
                                presupuesto.Precio -
                                    presupuesto.Precio *
                                        (presupuesto.Descuento / 100),
                            )}
                        </p>
                    </div>
                    <div className="flex justify-between pb-1">
                        <div className="flex">
                            <p>IVA: </p>
                            <p className="p-0">
                                ({presupuesto.CondFacturacion}%):{' '}
                            </p>
                        </div>
                        <p>{formatCurrency(presupuesto.IVA)}</p>
                    </div>

                    <Divider
                        style={{
                            borderColor: '#01662b',
                        }}
                    />
                    <div className="flex justify-between pt-1">
                        <p>
                            <strong>Total:</strong>
                        </p>
                        <p>
                            <strong>
                                {formatCurrency(presupuesto.PrecioFinal)}
                            </strong>
                        </p>
                    </div>
                </div>

                <div className="w-3/12 mr-20">
                    <div className="flex justify-between pb-1">
                        <p>Subtotal: </p>
                        <p>
                            {formatCurrency(
                                presupuesto.Precio *
                                    (1 - presupuesto.Descuento / 100),
                            )}
                        </p>
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
                            <strong>Total Final:</strong>
                        </p>
                        <p>
                            <strong>
                                {formatCurrency(presupuesto.PrecioFinal)}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 h-dvh">
                <h3 className="text-lg font-semibold mb-4">
                    Detalle de Puertas
                </h3>
                <PuertasInfoList presupuesto={presupuesto} />
            </div>
        </Box>
    )
}

export default PresPuertaInfoList
