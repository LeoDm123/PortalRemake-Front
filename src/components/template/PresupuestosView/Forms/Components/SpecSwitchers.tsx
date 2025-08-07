import React from 'react'
import { Field, FieldProps } from 'formik'
import { FormItem, Switcher } from '@/components/ui'
import { Puerta } from '@/@types/presupuesto'

interface Props {
    puertaEnEdicion: Puerta
    handlePuertaChange: (field: keyof Puerta, value: any) => void
}

const SpecSwitchers: React.FC<Props> = ({
    puertaEnEdicion,
    handlePuertaChange,
}) => {
    return (
        <div className="col-span-12 flex h-8">
            <FormItem className="w-1/4 h-full flex justify-center">
                <Field name="Puertas.0.Corrediza">
                    {({ field }: FieldProps) => (
                        <div className="flex items-center gap-1 ">
                            <Switcher
                                checked={puertaEnEdicion.Corrediza}
                                onChange={(checked) =>
                                    handlePuertaChange('Corrediza', checked)
                                }
                            />
                            <label className="text-sm font-medium">
                                Puerta corrediza
                            </label>
                        </div>
                    )}
                </Field>
            </FormItem>
            <FormItem className="w-1/4 h-full flex justify-center p-0">
                <Field name="Puertas.0.SinTerminacion">
                    {({ field }: FieldProps) => (
                        <div className="flex items-center gap-1 ">
                            <Switcher
                                checked={puertaEnEdicion.SinTerminacion}
                                onChange={(checked) =>
                                    handlePuertaChange(
                                        'SinTerminacion',
                                        checked,
                                    )
                                }
                            />
                            <label className="text-sm font-medium">
                                Sin terminación
                            </label>
                        </div>
                    )}
                </Field>
            </FormItem>
            <FormItem className="w-1/4 h-full flex justify-center p-0">
                <Field name="Puertas.0.SinColocacion">
                    {({ field }: FieldProps) => (
                        <div className="flex items-center gap-1 ">
                            <Switcher
                                checked={puertaEnEdicion.SinColocacion}
                                onChange={(checked) =>
                                    handlePuertaChange('SinColocacion', checked)
                                }
                            />
                            <label className="text-sm font-medium">
                                Sin colocación
                            </label>
                        </div>
                    )}
                </Field>
            </FormItem>
            <FormItem className="w-1/4 h-full flex justify-center">
                <Field name="Puertas.0.PuertaPrincipal">
                    {({ field }: FieldProps) => (
                        <div className="flex items-center gap-1 ">
                            <Switcher
                                checked={puertaEnEdicion.PuertaPrincipal}
                                onChange={(checked) =>
                                    handlePuertaChange(
                                        'PuertaPrincipal',
                                        checked,
                                    )
                                }
                            />
                            <label className="text-sm font-medium">
                                Puerta principal
                            </label>
                        </div>
                    )}
                </Field>
            </FormItem>
        </div>
    )
}

export default SpecSwitchers
