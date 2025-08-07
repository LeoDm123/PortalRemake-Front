import React from 'react'
import { FormItem, Input, Select } from '@/components/ui'
import { Field, FieldProps } from 'formik'
import { vidrios } from '@/constants/presupuestos.constant'
import { Puerta } from '@/@types/presupuesto'

interface Props {
    puerta: Puerta
    handleVidrioChange: (field: keyof Puerta['Vidrio'], value: any) => void
    handlePuertaChange: (field: keyof Puerta, value: any) => void
}

const ExtraSpecs: React.FC<Props> = ({
    puerta,

    handleVidrioChange,
    handlePuertaChange,
}) => {
    return (
        <div className="grid grid-cols-12 gap-2">
            <FormItem label="Tipo de vidrio" className="col-span-5 my-1">
                <Field name="Puertas.0.Vidrio.Codigo">
                    {({ field }: FieldProps) => {
                        return (
                            <Select
                                value={
                                    vidrios.find(
                                        (opt) =>
                                            opt.value === puerta.Vidrio.Codigo,
                                    ) || null
                                }
                                options={vidrios}
                                onChange={(option) =>
                                    handleVidrioChange(
                                        'Codigo',
                                        option?.value || '',
                                    )
                                }
                            />
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem label="Ancho [mm]" className="col-span-2 my-1">
                <Input
                    type="number"
                    value={puerta.Vidrio.Ancho}
                    onChange={(e) =>
                        handleVidrioChange('Ancho', Number(e.target.value))
                    }
                />
            </FormItem>
            <FormItem label="Alto [mm]" className="col-span-2 my-1">
                <Input
                    type="number"
                    value={puerta.Vidrio.Alto}
                    onChange={(e) =>
                        handleVidrioChange('Alto', Number(e.target.value))
                    }
                />
            </FormItem>
            <FormItem label="Cantidad" className="col-span-1 my-1">
                <Input
                    type="number"
                    value={puerta.Vidrio.Cantidad}
                    onChange={(e) =>
                        handleVidrioChange('Cantidad', Number(e.target.value))
                    }
                />
            </FormItem>
            <FormItem label="Complejidad (%)" className="col-span-2 my-1">
                <Input
                    type="number"
                    value={puerta.ComplejidadExtra}
                    onChange={(e) =>
                        handlePuertaChange(
                            'ComplejidadExtra',
                            Number(e.target.value),
                        )
                    }
                />
            </FormItem>
        </div>
    )
}

export default ExtraSpecs
