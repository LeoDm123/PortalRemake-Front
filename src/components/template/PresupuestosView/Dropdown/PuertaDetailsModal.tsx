import React, { useState } from 'react'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import {
    Modal,
    Card,
    DialogTitle,
    DialogContent,
    IconButton,
    Tooltip,
    DialogActions,
    Button,
    Divider,
} from '@mui/material'
import { Puerta } from '@/@types/presupuesto'
import DividerMain from '../../DividerMain'
import { HiOutlineXCircle } from 'react-icons/hi'
import formatCurrency from '@/utils/hooks/formatCurrency'

type PuertaDetailsModalProps = {
    puerta: Puerta
}

const PuertaDetailsModal: React.FC<PuertaDetailsModalProps> = ({ puerta }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Tooltip title="Ver información de la puerta" arrow>
                <IconButton size="small" onClick={handleOpen}>
                    <HiOutlineMenuAlt2 />
                </IconButton>
            </Tooltip>

            <Modal open={open} onClose={handleClose}>
                <Card
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '30%',
                        height: '56%',
                    }}
                >
                    <div className="p-3">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h4
                                    id="modal-title"
                                    style={{ color: '#01662b' }}
                                >
                                    Información de la puerta
                                </h4>
                                <DividerMain />
                            </div>

                            <IconButton
                                onClick={handleClose}
                                style={{ color: '#01662b', padding: 0 }}
                                size="large"
                            >
                                <HiOutlineXCircle />
                            </IconButton>
                        </div>
                        <div className="flex justify-start gap-8">
                            <p>
                                Es corrediza: {puerta.Corrediza ? 'Sí' : 'No'}
                            </p>
                            <p>
                                Sin terminación:{' '}
                                {puerta.SinTerminacion ? 'Sí' : 'No'}
                            </p>
                        </div>
                        <div className="flex justify-start gap-8">
                            <p>
                                Sin colocación:{' '}
                                {puerta.SinColocacion ? 'Sí' : 'No'}
                            </p>
                            <p>
                                Complejidad extra:{' '}
                                {puerta.ComplejidadExtra ?? 0}%
                            </p>
                        </div>
                        <div>
                            <div>
                                <h6 className="mt-3 mb-1">
                                    Desgloce de precios
                                </h6>
                                <Divider />
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Precio Marco:</p>{' '}
                                <p>
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Marco',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between mt-1">
                                <p>Precio Hoja:</p>{' '}
                                <p>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Hoja',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between mt-1">
                                <p>Precio Tapajuntas:</p>{' '}
                                <p>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Tapajuntas',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between mt-1">
                                <p>Precio Terminación:</p>{' '}
                                <p>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Terminación',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between mt-1">
                                <p>Precio Apliques:</p>{' '}
                                <p>
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Aplique',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between mt-1">
                                <p>Precio Vidrio:</p>{' '}
                                <p>
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Vidrio',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between mt-1">
                                <p>Precio M.O. Fabricación:</p>{' '}
                                <p>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Fabricación',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between mt-1">
                                <p>Precio M.O. Colocación de Herrajes:</p>{' '}
                                <p>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) =>
                                                p.Detalle ===
                                                'Colocación Herrajes',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-between my-1">
                                <p>Precio M.O. Colocación en Obra:</p>{' '}
                                <p>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) =>
                                                p.Detalle === 'Colocación Obra',
                                        )?.Precio ?? 0,
                                    )}
                                </p>
                            </div>
                            <DividerMain />
                            <div className="flex justify-between mt-1">
                                <strong>Precio Total:</strong>{' '}
                                <strong>
                                    {' '}
                                    {formatCurrency(
                                        puerta.Precios.find(
                                            (p) => p.Detalle === 'Total',
                                        )?.Precio ?? 0,
                                    )}
                                </strong>
                            </div>
                        </div>
                    </div>
                </Card>
            </Modal>
        </>
    )
}

export default PuertaDetailsModal
