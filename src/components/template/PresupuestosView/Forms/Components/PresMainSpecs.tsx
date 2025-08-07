import React from 'react'
import FormItem from '@/components/ui/Form/FormItem'
import { Input, Select } from '@/components/ui'
import { Field, FieldProps } from 'formik'
import { condFacturacion } from '@/constants/presupuestos.constant'
import { Puerta } from '@/@types/presupuesto'

interface Props {}

const PresMainSpecs: React.FC<Props> = ({}) => {
    return (
        <div>
            <div className="grid grid-cols-12 gap-2">
                <FormItem className="col-span-3 mb-3" label="Cliente" asterisk>
                    <Field name="Cliente">
                        {({ field }: FieldProps) => <Input {...field} />}
                    </Field>
                </FormItem>
                <FormItem className="col-span-3 mb-3" label="Obra" asterisk>
                    <Field name="Obra">
                        {({ field }: FieldProps) => <Input {...field} />}
                    </Field>
                </FormItem>
                <FormItem label="Descuento (%)" className="col-span-1 mb-3">
                    <Field name="Descuento">
                        {({ field }: FieldProps) => (
                            <Input type="number" {...field} />
                        )}
                    </Field>
                </FormItem>
                <FormItem label="Cond. Facturación" className="col-span-2 mb-3">
                    <Field name="CondFacturacion">
                        {({ field, form }: FieldProps) => (
                            <Select
                                value={
                                    condFacturacion.find(
                                        (o) => o.value === field.value,
                                    ) || null
                                }
                                options={condFacturacion}
                                onChange={(opt) =>
                                    form.setFieldValue(
                                        'CondFacturacion',
                                        opt?.value || '',
                                    )
                                }
                            />
                        )}
                    </Field>
                </FormItem>
            </div>
        </div>
    )
}

export default PresMainSpecs
