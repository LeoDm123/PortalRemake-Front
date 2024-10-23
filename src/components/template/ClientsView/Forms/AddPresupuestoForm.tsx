import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, FieldProps, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Input, Select } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { createPresupuesto, fetchClientById } from '@/api/api'
import { Client, Presupuesto } from '@/@types/clientInfo'
import formatCurrency from '@/utils/hooks/formatCurrency'

type Props = {
    selectedClientIndex: string
    onSubmitPay: () => void
    submitRef: React.MutableRefObject<() => void>
}

const AddPresupuestoForm: React.FC<Props> = ({
    selectedClientIndex,
    onSubmitPay,
    submitRef,
}) => {
    const [clientByID, setClientByID] = useState<Client | null>(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadClient = async () => {
            try {
                const clientData = await fetchClientById(selectedClientIndex)
                setClientByID(clientData)
            } catch (error) {
                console.error('Error al cargar los datos del cliente:', error)
            }
        }

        loadClient()
    }, [selectedClientIndex])

    const initialValues: Presupuesto = {
        CondicionFacturacion: '',
        IVA: 0,
        Precio: 0,
        PresupuestoCodigo: '',
        Total: 0,
        Pagos: [],
        Estado: 'Activo',
        _id: '',
    }

    const validationSchema = Yup.object().shape({
        PresupuestoCodigo: Yup.string().required(
            'Código de presupuesto es requerido',
        ),
        Precio: Yup.number().required('El precio del presupuesto es requerido'),
        CondicionFacturacion: Yup.string().required(
            'Condición de facturación es requerida',
        ),
    })

    const calcularIVA = (precio: number, condicion: string): number => {
        let iva = 0
        switch (condicion) {
            case '100%':
                iva = precio * 0.21
                break
            case '65%':
                iva = precio * 0.1365
                break
            case '50%':
                iva = precio * 0.105
                break
            case '0%':
                iva = 0
                break
            default:
                iva = 0
        }
        return iva
    }

    const calcularTotal = (precio: number, iva: number): number => {
        return precio + iva
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (
                values,
                { setSubmitting }: FormikHelpers<Presupuesto>,
            ) => {
                setSubmitting(true)
                if (!clientByID) {
                    setMessage('Cliente no encontrado')
                    setSubmitting(false)
                    return
                }

                const result = await createPresupuesto(
                    values.PresupuestoCodigo,
                    values.CondicionFacturacion,
                    values.IVA,
                    values.Precio,
                    values.Total,
                    clientByID.ClientCUIT,
                    values.Estado,
                )

                if (result?.status === 'failed') {
                    setMessage(result.message)
                } else {
                    setMessage('Presupuesto agregado exitosamente')
                    onSubmitPay()
                }

                setSubmitting(false)
            }}
        >
            {({ values, setFieldValue, errors, touched, submitForm }) => {
                submitRef.current = submitForm

                useEffect(() => {
                    const ivaCalculado = calcularIVA(
                        values.Precio,
                        values.CondicionFacturacion,
                    )
                    const totalCalculado = calcularTotal(
                        values.Precio,
                        ivaCalculado,
                    )

                    setFieldValue('IVA', ivaCalculado)
                    setFieldValue('Total', totalCalculado)
                }, [values.Precio, values.CondicionFacturacion, setFieldValue])

                return (
                    <Form>
                        <FormContainer>
                            <div className="flex justify-between items-center">
                                <FormItem
                                    className="w-4/12"
                                    label="Cliente"
                                    invalid={false}
                                >
                                    <Input
                                        type="text"
                                        value={`${clientByID?.ClientName} ${clientByID?.ClientApellido}`}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-4/12 mx-2"
                                    label="CUIT"
                                    invalid={false}
                                >
                                    <Input
                                        type="text"
                                        value={clientByID?.ClientCUIT || ''}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-4/12"
                                    label="Código de Presupuesto"
                                    invalid={
                                        !!(
                                            errors.PresupuestoCodigo &&
                                            touched.PresupuestoCodigo
                                        )
                                    }
                                    errorMessage={errors.PresupuestoCodigo}
                                >
                                    <Field
                                        type="text"
                                        name="PresupuestoCodigo"
                                        component={Input}
                                        placeholder="Código de Presupuesto"
                                    />
                                </FormItem>
                            </div>

                            <div className="flex justify-between items-center">
                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Precio con Descuento"
                                    invalid={
                                        !!(errors.Precio && touched.Precio)
                                    }
                                    errorMessage={errors.Precio}
                                >
                                    <Field
                                        type="number"
                                        name="Precio"
                                        component={Input}
                                        placeholder="Precio c/Descuento"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 mx-2"
                                    label="Condición de Facturación"
                                    invalid={
                                        !!(
                                            errors.CondicionFacturacion &&
                                            touched.CondicionFacturacion
                                        )
                                    }
                                    errorMessage={errors.CondicionFacturacion}
                                >
                                    <Field name="CondicionFacturacion">
                                        {({ field, form }: FieldProps) => {
                                            const condicionOptions = [
                                                {
                                                    value: '100%',
                                                    label: '100% - (21%)',
                                                },
                                                {
                                                    value: '65%',
                                                    label: '65% - (13,65%)',
                                                },
                                                {
                                                    value: '50%',
                                                    label: '50% - (10,5%)',
                                                },
                                                {
                                                    value: '0%',
                                                    label: '0%',
                                                },
                                            ]

                                            const selectedCondicion =
                                                condicionOptions.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value,
                                                )

                                            return (
                                                <Select
                                                    {...field}
                                                    value={
                                                        selectedCondicion ||
                                                        null
                                                    }
                                                    options={condicionOptions}
                                                    placeholder="Seleccionar cond. de facturación"
                                                    onChange={(
                                                        newValue: {
                                                            value: string
                                                        } | null,
                                                    ) => {
                                                        form.setFieldValue(
                                                            'CondicionFacturacion',
                                                            newValue
                                                                ? newValue.value
                                                                : '',
                                                        )
                                                    }}
                                                    isClearable
                                                />
                                            )
                                        }}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="IVA"
                                    invalid={!!(errors.IVA && touched.IVA)}
                                    errorMessage={errors.IVA}
                                >
                                    <Input
                                        type="text"
                                        value={formatCurrency(values.IVA)}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Total"
                                    invalid={!!(errors.Total && touched.Total)}
                                    errorMessage={errors.Total}
                                >
                                    <Input
                                        type="text"
                                        value={formatCurrency(values.Total)}
                                        disabled
                                    />
                                </FormItem>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddPresupuestoForm
