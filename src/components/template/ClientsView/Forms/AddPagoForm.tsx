import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, FieldProps, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Input, Select } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { createPayment, fetchClientById } from '@/api/api'
import getCurrentDate from '@/utils/hooks/getCurrentDate'
import { Client, Presupuesto, Pago } from '@/@types/clientInfo'
import useCurrencyInput from '@/utils/hooks/useCurrencyInput'

type Props = {
    selectedClientIndex: string
    onSubmitPay: () => void
    submitRef: React.MutableRefObject<() => void>
}

interface Option {
    value: string
    label: string
}

const AddPagoForm: React.FC<Props> = ({
    selectedClientIndex,
    onSubmitPay,
    submitRef,
}) => {
    const [clientByID, setClientByID] = useState<Client | null>(null)
    const [message, setMessage] = useState('')
    const [conceptOptions, setConceptOptions] = useState<Option[]>([])

    const pagoMontoInput = useCurrencyInput(0)

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

    const initialValues: Pago = {
        PresupuestoCodigo: '',
        PagoMonto: pagoMontoInput.value,
        PagoCondicion: '',
        PagoConcepto: '',
        FechaPago: getCurrentDate(),
        PagoComprobante: '',
        Comentarios: '',
        _id: '',
    }

    const validationSchema = Yup.object().shape({
        PresupuestoCodigo: Yup.string().required(
            'Código de presupuesto es requerido',
        ),
        PagoMonto: Yup.number()
            .required('Monto es requerido')
            .min(0, 'El monto debe ser mayor que 0'),
        PagoCondicion: Yup.string().required('Condición de pago es requerida'),
        PagoConcepto: Yup.string().required('Concepto de pago es requerido'),
        FechaPago: Yup.date().required('Fecha de pago es requerida'),
        PagoComprobante: Yup.string(),
        Comentarios: Yup.string(),
    })

    const handlePagoCondicionChange = (newValue: string) => {
        const conceptoOptionsMap: { [key: string]: Option[] } = {
            Pago: [
                { value: 'Anticipo Parcial', label: 'Anticipo Parcial' },
                { value: 'Anticipo Completo', label: 'Anticipo Completo' },
                { value: 'Saldo Parcial', label: 'Saldo Parcial' },
                { value: 'Saldo Completo', label: 'Saldo Completo' },
            ],
            ND: [
                { value: 'Actualización', label: 'Actualización' },
                { value: 'Extra', label: 'Extra' },
                { value: 'Devolución Parcial', label: 'Devolución Parcial' },
                { value: 'Devolución Completa', label: 'Devolución Completa' },
            ],
            NC: [
                { value: 'Descuento Extra', label: 'Descuento Extra' },
                {
                    value: 'Retención de Impuestos',
                    label: 'Retención de Impuestos',
                },
            ],
        }

        const options = conceptoOptionsMap[newValue] || []

        setConceptOptions(options)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (
                values,
                { setSubmitting }: FormikHelpers<Pago>,
            ) => {
                setSubmitting(true)
                if (!clientByID) {
                    setMessage('Cliente no encontrado')
                    setSubmitting(false)
                    return
                }

                const result = await createPayment(
                    clientByID.ClientCUIT,
                    values.PresupuestoCodigo,
                    values.FechaPago,
                    values.PagoCondicion,
                    values.PagoConcepto,
                    values.PagoComprobante,
                    values.PagoMonto,
                    values.Comentarios,
                )

                if (result?.status === 'failed') {
                    setMessage(result.message)
                } else {
                    setMessage('Pago agregado exitosamente')
                    onSubmitPay()
                }

                setSubmitting(false)
            }}
        >
            {({ values, setFieldValue, submitForm, errors, touched }) => {
                submitRef.current = submitForm

                useEffect(() => {
                    setFieldValue('PagoMonto', pagoMontoInput.value)
                }, [pagoMontoInput.value, setFieldValue])

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
                                    <Field name="PresupuestoCodigo">
                                        {({ field, form }: FieldProps) => {
                                            const presupuestoOptions =
                                                clientByID?.Presupuestos.map(
                                                    (
                                                        presupuesto: Presupuesto,
                                                    ) => ({
                                                        value: presupuesto.PresupuestoCodigo,
                                                        label: presupuesto.PresupuestoCodigo,
                                                    }),
                                                ) || []

                                            const selectedPresupuesto =
                                                presupuestoOptions.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value,
                                                )

                                            return (
                                                <Select
                                                    {...field}
                                                    value={
                                                        selectedPresupuesto ||
                                                        null
                                                    }
                                                    options={presupuestoOptions}
                                                    placeholder="Seleccionar código de presupuesto"
                                                    onChange={(
                                                        newValue: {
                                                            value: string
                                                        } | null,
                                                    ) => {
                                                        form.setFieldValue(
                                                            'PresupuestoCodigo',
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
                            </div>

                            <div className="flex justify-between items-center">
                                <FormItem
                                    className="w-3/12"
                                    label="Fecha del Pago"
                                    invalid={
                                        !!(
                                            errors.FechaPago &&
                                            touched.FechaPago
                                        )
                                    }
                                    errorMessage={errors.FechaPago}
                                >
                                    <Field
                                        type="date"
                                        name="FechaPago"
                                        component={Input}
                                        placeholder="Fecha del Pago"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Monto del Pago"
                                    invalid={
                                        !!(
                                            errors.PagoMonto &&
                                            touched.PagoMonto
                                        )
                                    }
                                    errorMessage={errors.PagoMonto}
                                >
                                    <Input
                                        type="text"
                                        value={pagoMontoInput.formattedValue}
                                        onChange={(e) =>
                                            pagoMontoInput.handleChange(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Monto del Pago"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 mx-2"
                                    label="Condición de Pago"
                                    invalid={
                                        !!(
                                            errors.PagoCondicion &&
                                            touched.PagoCondicion
                                        )
                                    }
                                    errorMessage={errors.PagoCondicion}
                                >
                                    <Field name="PagoCondicion">
                                        {({ field, form }: FieldProps) => {
                                            const condicionOptions = [
                                                {
                                                    value: 'Pago',
                                                    label: 'Pago',
                                                },
                                                {
                                                    value: 'NC',
                                                    label: 'Nota de Crédito',
                                                },
                                                {
                                                    value: 'ND',
                                                    label: 'Nota de Débito',
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
                                                    placeholder="Seleccionar condición de pago"
                                                    onChange={(
                                                        newValue: {
                                                            value: string
                                                        } | null,
                                                    ) => {
                                                        form.setFieldValue(
                                                            'PagoCondicion',
                                                            newValue
                                                                ? newValue.value
                                                                : '',
                                                        )
                                                        handlePagoCondicionChange(
                                                            newValue?.value ||
                                                                '',
                                                        )
                                                    }}
                                                    isClearable
                                                />
                                            )
                                        }}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    className="w-3/12"
                                    label="Concepto de Pago"
                                    invalid={
                                        !!(
                                            errors.PagoConcepto &&
                                            touched.PagoConcepto
                                        )
                                    }
                                    errorMessage={errors.PagoConcepto}
                                >
                                    <Field name="PagoConcepto">
                                        {({ field, form }: FieldProps) => {
                                            const selectedConcepto =
                                                conceptOptions.find(
                                                    (option) =>
                                                        option.value ===
                                                        field.value,
                                                )

                                            return (
                                                <Select
                                                    {...field}
                                                    value={
                                                        selectedConcepto || null
                                                    }
                                                    options={conceptOptions}
                                                    placeholder="Seleccionar concepto de pago"
                                                    onChange={(
                                                        newValue: {
                                                            value: string
                                                        } | null,
                                                    ) => {
                                                        form.setFieldValue(
                                                            'PagoConcepto',
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
                            </div>

                            <div className="flex justify-between items-center">
                                <FormItem
                                    className="w-4/12"
                                    label="Número de Comprobante"
                                    invalid={
                                        !!(
                                            errors.PagoComprobante &&
                                            touched.PagoComprobante
                                        )
                                    }
                                    errorMessage={errors.PagoComprobante}
                                >
                                    <Field
                                        type="text"
                                        name="PagoComprobante"
                                        component={Input}
                                        placeholder="Número de Comprobante"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-8/12 ml-2"
                                    label="Comentarios"
                                    invalid={
                                        !!(
                                            errors.Comentarios &&
                                            touched.Comentarios
                                        )
                                    }
                                    errorMessage={errors.Comentarios}
                                >
                                    <Field
                                        type="text"
                                        name="Comentarios"
                                        component={Input}
                                        placeholder="Comentarios"
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

export default AddPagoForm
