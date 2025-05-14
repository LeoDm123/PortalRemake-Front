import React, { useEffect } from 'react'
import { Formik, Form, FieldProps, Field } from 'formik'
import { Input, Button, Select } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { createMaterial } from '@/api/api'
import Swal from 'sweetalert2'

type MatAddFormProps = {
    onAddSuccess: () => void
}

type Option = {
    value: string
    label: string
}

const MatAddForm: React.FC<MatAddFormProps> = ({ onAddSuccess }) => {
    const handleConfirmAdd = (values: any) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas guardar los cambios en este material?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleAdd(values)
            }
        })
    }

    const handleAdd = async (values: any) => {
        try {
            await createMaterial(values)
            Swal.fire({
                title: 'Guardado',
                text: 'El material ha sido registrado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            if (onAddSuccess) onAddSuccess()
        } catch (error) {
            console.error('Error al registrar el material:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al registrar el material.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }
    return (
        <Formik
            initialValues={{
                Codigo: '',
                Descripcion: '',
                Categoria: '',
                Unidad: '',
                Alto: '',
                Ancho: '',
                Largo: '',
                Espesor: '',
                StockSeguridad: '',
                Stock: '',
                Proveedor: '',
                Recepciones: '',
            }}
            onSubmit={(values) => handleConfirmAdd(values)}
        >
            {({ values, handleChange, errors, touched }) => (
                <Form>
                    <FormContainer>
                        <div className="flex justify-between items-center">
                            <FormItem label="Código" className="w-2/12 mr-1">
                                <Input
                                    type="text"
                                    name="Codigo"
                                    value={values.Codigo}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem
                                label="Descripción"
                                className="w-10/12 ml-1"
                            >
                                <Input
                                    type="text"
                                    name="Descripcion"
                                    value={values.Descripcion}
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </div>

                        <div className="grid grid-cols-6 gap-4">
                            <FormItem
                                className="col-span-2"
                                label="Categoría"
                                invalid={
                                    !!(errors.Categoria && touched.Categoria)
                                }
                                errorMessage={
                                    typeof errors.Categoria === 'string'
                                        ? errors.Categoria
                                        : undefined
                                }
                            >
                                <Field name="Categoria">
                                    {({ field, form }: FieldProps) => {
                                        const categoriaOptions: Option[] = [
                                            {
                                                value: 'Perfileria de PVC',
                                                label: 'Perfilería de PVC',
                                            },
                                            {
                                                value: 'Madera Maciza y Alistonados',
                                                label: 'Madera Maciza y Alistonados',
                                            },
                                            {
                                                value: 'Placas de MDF y Cantos',
                                                label: 'Placas de MDF y Cantos',
                                            },
                                            {
                                                value: 'Deck y Revestimientos de WPC',
                                                label: 'Deck y Revestimientos de WPC',
                                            },
                                            {
                                                value: 'Insumos de Lustre',
                                                label: 'Insumos de Lustre',
                                            },
                                            {
                                                value: 'Insumos Varios',
                                                label: 'Insumos Varios',
                                            },
                                            {
                                                value: 'Herrajes para Aberturas de PVC',
                                                label: 'Herrajes para Aberturas de PVC',
                                            },
                                            {
                                                value: 'Herrajes para Puertas de Madera',
                                                label: 'Herrajes para Puertas de Madera',
                                            },
                                        ]

                                        const selectedCategoria =
                                            categoriaOptions.find(
                                                (option) =>
                                                    option.value ===
                                                    field.value,
                                            )

                                        return (
                                            <Select
                                                {...field}
                                                value={
                                                    selectedCategoria || null
                                                }
                                                options={categoriaOptions}
                                                placeholder="Seleccionar categoría"
                                                onChange={(newValue) => {
                                                    form.setFieldValue(
                                                        'Categoria',
                                                        newValue?.value || '',
                                                    )
                                                }}
                                                isClearable
                                            />
                                        )
                                    }}
                                </Field>
                            </FormItem>

                            <FormItem
                                className="col-span-2"
                                label="Proveedor"
                                invalid={
                                    !!(errors.Proveedor && touched.Proveedor)
                                }
                                errorMessage={
                                    typeof errors.Proveedor === 'string'
                                        ? errors.Proveedor
                                        : undefined
                                }
                            >
                                <Field name="Proveedor">
                                    {({ field, form }: FieldProps) => {
                                        const proveedorOptions: Option[] = [
                                            {
                                                value: 'Rehau S.A.',
                                                label: 'Rehau S.A.',
                                            },
                                            {
                                                value: 'Vidrial S.R.L',
                                                label: 'Vidrial S.R.L',
                                            },
                                            {
                                                value: 'Magnum Herrajes',
                                                label: 'Magnum Herrajes',
                                            },
                                            {
                                                value: 'G.U. Herrajes',
                                                label: 'G.U. Herrajes',
                                            },
                                            {
                                                value: 'Madergold',
                                                label: 'Madergold',
                                            },
                                            {
                                                value: 'Maderplak',
                                                label: 'Maderplak',
                                            },
                                            {
                                                value: 'MS Maderas',
                                                label: 'MS Maderas',
                                            },
                                            {
                                                value: 'Vancar',
                                                label: 'Vancar',
                                            },
                                            { value: 'Würth', label: 'Würth' },
                                            {
                                                value: 'Pinturería Silva',
                                                label: 'Pinturería Silva',
                                            },
                                            {
                                                value: 'Cromosol',
                                                label: 'Cromosol',
                                            },
                                        ]

                                        const selectedProveedor =
                                            proveedorOptions.find(
                                                (option) =>
                                                    option.value ===
                                                    field.value,
                                            )

                                        return (
                                            <Select
                                                {...field}
                                                value={
                                                    selectedProveedor || null
                                                }
                                                options={proveedorOptions}
                                                placeholder="Seleccionar proveedor"
                                                onChange={(newValue) => {
                                                    form.setFieldValue(
                                                        'Proveedor',
                                                        newValue?.value || '',
                                                    )
                                                }}
                                                isClearable
                                            />
                                        )
                                    }}
                                </Field>
                            </FormItem>

                            <FormItem
                                className="col-span-1"
                                label="Unidad"
                                invalid={!!(errors.Unidad && touched.Unidad)}
                                errorMessage={
                                    typeof errors.Unidad === 'string'
                                        ? errors.Unidad
                                        : undefined
                                }
                            >
                                <Field name="Unidad">
                                    {({ field, form }: FieldProps) => {
                                        const unidadOptions: Option[] = [
                                            {
                                                value: 'ml',
                                                label: 'Metro lineal [ml.]',
                                            },
                                            {
                                                value: 'm2',
                                                label: 'Metro cuadrado [m2.]',
                                            },
                                            {
                                                value: 'm3',
                                                label: 'Metro cúbico [m3.]',
                                            },
                                            {
                                                value: 'pie2',
                                                label: 'Pie cuadrado [pie2.]',
                                            },
                                            {
                                                value: 'u',
                                                label: 'Unidad [u.]',
                                            },
                                        ]

                                        const selectedUnidad =
                                            unidadOptions.find(
                                                (option) =>
                                                    option.value ===
                                                    field.value,
                                            )

                                        return (
                                            <Select
                                                {...field}
                                                value={selectedUnidad || null}
                                                options={unidadOptions}
                                                placeholder="Seleccionar unidad"
                                                onChange={(newValue) => {
                                                    form.setFieldValue(
                                                        'Unidad',
                                                        newValue?.value || '',
                                                    )
                                                }}
                                                isClearable
                                            />
                                        )
                                    }}
                                </Field>
                            </FormItem>

                            <FormItem
                                label="Stock de Seguridad"
                                className="col-span-1"
                            >
                                <Input
                                    type="number"
                                    name="StockSeguridad"
                                    value={values.StockSeguridad}
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <FormItem label="Alto">
                                <Input
                                    type="number"
                                    name="Alto"
                                    value={values.Alto}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Ancho">
                                <Input
                                    type="number"
                                    name="Ancho"
                                    value={values.Ancho}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Largo">
                                <Input
                                    type="number"
                                    name="Largo"
                                    value={values.Largo}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Espesor">
                                <Input
                                    type="number"
                                    name="Espesor"
                                    value={values.Espesor}
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button type="submit" variant="solid">
                                Agregar material
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default MatAddForm
