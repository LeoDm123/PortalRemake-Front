import React, { useState } from 'react'
import { Formik, Field, Form, FormikHelpers, FieldProps } from 'formik'
import * as Yup from 'yup'
import { Input, Select } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { createClient } from '@/api/api'

type Props = {
    onSubmitClient: () => void
    submitRef: React.MutableRefObject<() => void>
}

interface Option {
    value: string
    label: string
}

const AddClientForm: React.FC<Props> = ({ onSubmitClient, submitRef }) => {
    const [message, setMessage] = useState('')

    const initialValues = {
        ClientName: '',
        ClientApellido: '',
        ClientIVACond: '',
        ClientDNI: '',
        ClientCUIT: '',
        ClientAdress: '',
        ClientTel: '',
        ClientEmail: '',
        ClientStatus: 'Activo',
    }

    const validationSchema = Yup.object().shape({
        ClientName: Yup.string().required(
            'Nombre o razón social del cliente requerido',
        ),
        ClientApellido: Yup.string().required('Apellido del cliente requerido'),
        ClientDNI: Yup.number()
            .required('DNI es requerido')
            .min(1000000, 'El número debe tener al menos 7 cifras'),
        ClientCUIT: Yup.string()
            .required('CUIT es requerido')
            .min(13, 'El CUIT debe tener 13 caracteres incluyendo guiones'),
        ClientIVACond: Yup.string().required('Condición de IVA es requerida'),
        ClientAdress: Yup.string().required('Dirección es requerida'),
        ClientTel: Yup.number()
            .required('Teléfono de contacto es requerido')
            .min(1000000, 'El número debe tener al menos 7 cifras'),
        ClientEmail: Yup.string()
            .email('Correo electrónico inválido')
            .required('Correo electrónico es requerido'),
    })

    const handleCUITChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean,
        ) => void,
    ) => {
        const inputNumber = e.target.value.replace(/\D/g, '')
        const paddedNumber = inputNumber.padStart(11, '')
        const formattedCuit = `${paddedNumber.substring(0, 2)}-${paddedNumber.substring(2, 10)}-${paddedNumber.charAt(10)}`
        setFieldValue('ClientCUIT', formattedCuit)
    }

    const registerClient = async (values: any) => {
        try {
            const response = await createClient(
                values.ClientName,
                values.ClientApellido,
                values.ClientIVACond,
                values.ClientDNI,
                values.ClientCUIT,
                values.ClientAdress,
                values.ClientTel,
                values.ClientEmail,
                values.ClientStatus,
            )
            if (response?.msg === 'Cliente registrado') {
                setMessage('Cliente registrado exitosamente')
                onSubmitClient()
            } else {
                setMessage(response?.msg || 'Error al registrar el cliente')
            }
        } catch (error) {
            setMessage('Error al registrar el cliente')
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<any>) => {
                setSubmitting(true)
                await registerClient(values)
                setSubmitting(false)
            }}
        >
            {({ submitForm, errors, touched, setFieldValue }) => {
                submitRef.current = submitForm

                return (
                    <Form>
                        <FormContainer>
                            <div className="flex justify-between items-center">
                                <FormItem
                                    className="w-3/12"
                                    label="Nombre o razón social del Cliente"
                                    invalid={
                                        !!(
                                            errors.ClientName &&
                                            touched.ClientName
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientName === 'string'
                                            ? errors.ClientName
                                            : undefined
                                    }
                                >
                                    <Field
                                        name="ClientName"
                                        component={Input}
                                        placeholder="Nombre o razón social"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Apellido del Cliente"
                                    invalid={
                                        !!(
                                            errors.ClientApellido &&
                                            touched.ClientApellido
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientApellido ===
                                        'string'
                                            ? errors.ClientApellido
                                            : undefined
                                    }
                                >
                                    <Field
                                        name="ClientApellido"
                                        component={Input}
                                        placeholder="Apellido"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Condición de IVA"
                                    invalid={
                                        !!(
                                            errors.ClientIVACond &&
                                            touched.ClientIVACond
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientIVACond === 'string'
                                            ? errors.ClientIVACond
                                            : undefined
                                    }
                                >
                                    <Field name="ClientIVACond">
                                        {({ field }: FieldProps) => {
                                            const condicionOptions: Option[] = [
                                                {
                                                    value: 'Responsable Inscripto',
                                                    label: 'Responsable Inscripto',
                                                },
                                                {
                                                    value: 'Consumidor Final',
                                                    label: 'Consumidor Final',
                                                },
                                                {
                                                    value: 'Monotributista',
                                                    label: 'Monotributista',
                                                },
                                                {
                                                    value: 'Exento',
                                                    label: 'Exento',
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
                                                    onChange={(newValue) => {
                                                        setFieldValue(
                                                            'ClientIVACond',
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
                                    label="CUIT del Cliente"
                                    invalid={
                                        !!(
                                            errors.ClientCUIT &&
                                            touched.ClientCUIT
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientCUIT === 'string'
                                            ? errors.ClientCUIT
                                            : undefined
                                    }
                                >
                                    <Field name="ClientCUIT">
                                        {({ field, form }: FieldProps) => (
                                            <Input
                                                {...field}
                                                placeholder="CUIT"
                                                onChange={(e) =>
                                                    handleCUITChange(
                                                        e,
                                                        form.setFieldValue,
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </div>

                            <div className="flex justify-between items-center">
                                <FormItem
                                    className="w-3/12"
                                    label="DNI del Cliente"
                                    invalid={
                                        !!(
                                            errors.ClientDNI &&
                                            touched.ClientDNI
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientDNI === 'string'
                                            ? errors.ClientDNI
                                            : undefined
                                    }
                                >
                                    <Field
                                        name="ClientDNI"
                                        component={Input}
                                        placeholder="DNI"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Dirección"
                                    invalid={
                                        !!(
                                            errors.ClientAdress &&
                                            touched.ClientAdress
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientAdress === 'string'
                                            ? errors.ClientAdress
                                            : undefined
                                    }
                                >
                                    <Field
                                        name="ClientAdress"
                                        component={Input}
                                        placeholder="Dirección"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Teléfono del Cliente"
                                    invalid={
                                        !!(
                                            errors.ClientTel &&
                                            touched.ClientTel
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientTel === 'string'
                                            ? errors.ClientTel
                                            : undefined
                                    }
                                >
                                    <Field
                                        name="ClientTel"
                                        component={Input}
                                        placeholder="Teléfono"
                                    />
                                </FormItem>

                                <FormItem
                                    className="w-3/12 ml-2"
                                    label="Correo Electrónico"
                                    invalid={
                                        !!(
                                            errors.ClientEmail &&
                                            touched.ClientEmail
                                        )
                                    }
                                    errorMessage={
                                        typeof errors.ClientEmail === 'string'
                                            ? errors.ClientEmail
                                            : undefined
                                    }
                                >
                                    <Field
                                        name="ClientEmail"
                                        component={Input}
                                        placeholder="Correo Electrónico"
                                    />
                                </FormItem>
                            </div>
                        </FormContainer>

                        {message && (
                            <div
                                className={
                                    message.includes('exitosamente')
                                        ? 'alert alert-success mt-4'
                                        : 'alert alert-danger mt-4'
                                }
                            >
                                {message}
                            </div>
                        )}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddClientForm
