import React, { useEffect, useState } from 'react'
import { Formik, Form, FieldProps, Field } from 'formik'
import { Input, Button, Select } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { useMateriales } from '@/utils/hooks/useMateriales'
import getCurrentDate from '@/utils/hooks/getCurrentDate'
import Swal from 'sweetalert2'
import { createInventarioLog, updateStockMaterial } from '@/api/api'
import { Material, InventarioLog } from '@/@types/mats'

export type MovimientoFormValues = {
    Fecha: string
    Categoria: string
    Descripcion: string
    Codigo: string
    Unidad: string
    TipoMov: InventarioLog['TipoMov'] | ''
    Cantidad: string
    Comentario: string
    NroPedido: string
    MatID: string
}

const AddMovInvForm = ({ onAddSuccess }: { onAddSuccess: () => void }) => {
    const Today = getCurrentDate()
    const { materiales: MatsData } = useMateriales()
    const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([])

    const categorias = [
        'Perfilería de PVC',
        'Madera Maciza y Alistonados',
        'Placas de MDF y Cantos',
        'Deck y Revestimientos de WPC',
        'Insumos de Lustre',
        'Insumos Varios',
        'Herrajes para Aberturas de PVC',
        'Herrajes para Puertas de Madera',
    ]

    const tiposMov: Array<{ value: InventarioLog['TipoMov']; label: string }> =
        [
            { value: 'Ingreso', label: 'Ingreso' },
            { value: 'Egreso', label: 'Egreso' },
        ]

    return (
        <Formik<MovimientoFormValues>
            initialValues={{
                Fecha: Today,
                Categoria: '',
                Descripcion: '',
                Codigo: '',
                Unidad: '',
                TipoMov: '',
                Cantidad: '',
                Comentario: '',
                NroPedido: '',
                MatID: '',
            }}
            onSubmit={async (values) => {
                if (
                    !values.Codigo ||
                    !values.Descripcion ||
                    !values.Categoria
                ) {
                    Swal.fire(
                        'Error',
                        'Todos los campos son obligatorios.',
                        'error',
                    )
                    return
                }

                try {
                    await createInventarioLog({
                        Codigo: values.Codigo,
                        Descripcion: values.Descripcion,
                        Fecha: values.Fecha,
                        NroPedido: values.NroPedido,
                        TipoMov: values.TipoMov,
                        Cantidad: Number(values.Cantidad),
                        Unidad: values.Unidad,
                        Comentario: values.Comentario,
                    })

                    Swal.fire(
                        'Éxito',
                        'Movimiento registrado correctamente.',
                        'success',
                    )
                    onAddSuccess()
                } catch (error) {
                    console.error(error)
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al registrar el movimiento.',
                        'error',
                    )
                }
            }}
        >
            {({ values, handleChange, setFieldValue, errors, touched }) => {
                useEffect(() => {
                    if (values.Categoria === '') {
                        setFilteredMaterials(
                            [...MatsData].sort((a, b) =>
                                a.Descripcion.localeCompare(b.Descripcion),
                            ),
                        )
                    } else {
                        const filtered = MatsData.filter(
                            (material) =>
                                material.Categoria === values.Categoria,
                        )
                        setFilteredMaterials(
                            filtered.sort((a, b) =>
                                a.Descripcion.localeCompare(b.Descripcion),
                            ),
                        )
                    }
                }, [values.Categoria, MatsData])

                useEffect(() => {
                    const selectedMaterial = MatsData.find(
                        (mat) => mat.Descripcion === values.Descripcion,
                    )
                    if (selectedMaterial) {
                        setFieldValue('Codigo', selectedMaterial.Codigo)
                        setFieldValue('Unidad', selectedMaterial.Unidad)
                        setFieldValue('MatID', selectedMaterial._id)
                    } else {
                        setFieldValue('Codigo', '')
                    }
                }, [values.Descripcion, MatsData])

                return (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-2 gap-2">
                                <FormItem label="Categoría" className="my-0">
                                    <Field name="Categoria">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                {...field}
                                                value={
                                                    categorias.find(
                                                        (c) =>
                                                            c === field.value,
                                                    )
                                                        ? {
                                                              label: field.value,
                                                              value: field.value,
                                                          }
                                                        : null
                                                }
                                                options={categorias.map(
                                                    (c) => ({
                                                        label: c,
                                                        value: c,
                                                    }),
                                                )}
                                                placeholder="Seleccionar categoría"
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        'Categoria',
                                                        option?.value || '',
                                                    )
                                                }
                                                isClearable
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem label="Material" className="my-0">
                                    <Field name="Descripcion">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                {...field}
                                                value={
                                                    filteredMaterials.find(
                                                        (m) =>
                                                            m.Descripcion ===
                                                            field.value,
                                                    )
                                                        ? {
                                                              label: field.value,
                                                              value: field.value,
                                                          }
                                                        : null
                                                }
                                                options={filteredMaterials.map(
                                                    (mat) => ({
                                                        label: mat.Descripcion,
                                                        value: mat.Descripcion,
                                                    }),
                                                )}
                                                placeholder="Seleccionar material"
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        'Descripcion',
                                                        option?.value || '',
                                                    )
                                                }
                                                isClearable
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem label="Código" className="my-0">
                                    <Input
                                        name="Codigo"
                                        value={values.Codigo}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </FormItem>

                                <FormItem label="Fecha" className="my-0">
                                    <Input
                                        type="date"
                                        name="Fecha"
                                        value={values.Fecha}
                                        onChange={handleChange}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Tipo de Movimiento"
                                    className="my-0"
                                >
                                    <Field name="TipoMov">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                {...field}
                                                value={
                                                    tiposMov.find(
                                                        (t) =>
                                                            t.value ===
                                                            field.value,
                                                    ) || null
                                                }
                                                options={tiposMov}
                                                placeholder="Seleccionar tipo"
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        'TipoMov',
                                                        option?.value || '',
                                                    )
                                                }
                                                isClearable
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem label="Cantidad" className="my-0">
                                    <Input
                                        type="number"
                                        name="Cantidad"
                                        value={values.Cantidad}
                                        onChange={handleChange}
                                    />
                                </FormItem>

                                <FormItem label="Unidad" className="my-0">
                                    <Input
                                        name="Unidad"
                                        value={values.Unidad}
                                        readOnly
                                    />
                                </FormItem>

                                <FormItem label="N° de Pedido" className="my-0">
                                    <Input
                                        name="NroPedido"
                                        value={values.NroPedido}
                                        onChange={handleChange}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Comentario"
                                    className="col-span-2"
                                >
                                    <Input
                                        name="Comentario"
                                        value={values.Comentario}
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>

                            <div className="flex justify-end mt-4">
                                <Button type="submit" variant="solid">
                                    Registrar Movimiento
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddMovInvForm
