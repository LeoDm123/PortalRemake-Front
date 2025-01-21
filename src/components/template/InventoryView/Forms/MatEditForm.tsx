import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Input, Button } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import DividerMain from '@/components/template/DividerMain'
import { Material } from '@/@types/mats'
import { editMaterial, fetchMateriales } from '@/api/api'
import Swal from 'sweetalert2'

type MatEditFormProps = {
    material: Material
    onEditSuccess: () => void
}

const MatEditForm: React.FC<MatEditFormProps> = ({
    material,
    onEditSuccess,
}) => {
    const handleConfirmEdit = (values: any) => {
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
                handleEdit(values)
            }
        })
    }

    const handleEdit = async (values: any) => {
        try {
            await editMaterial(material._id, values)
            Swal.fire({
                title: 'Guardado',
                text: 'El material ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            if (onEditSuccess) onEditSuccess()
        } catch (error) {
            console.error('Error al actualizar el material:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el material.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    return (
        <Formik
            initialValues={{
                Codigo: material.Codigo,
                Descripcion: material.Descripcion,
                Categoria: material.Categoria,
                Unidad: material.Unidad,
                Alto: material.Alto,
                Ancho: material.Ancho,
                Largo: material.Largo,
                Espesor: material.Espesor,
                StockSeguridad: material.StockSeguridad,
                Stock: material.Stock,
                Proveedor: material.Proveedor,
                Recepciones: material.InvLog,
            }}
            onSubmit={(values) => handleConfirmEdit(values)}
        >
            {({ values, handleChange }) => (
                <Form>
                    <FormContainer>
                        <div className="flex justify-between items-center">
                            <FormItem label="Código" className="w-2/12 mr-1">
                                <Input
                                    type="text"
                                    name="Codigo"
                                    value={values.Codigo}
                                    disabled
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
                            <FormItem label="Categoría" className="col-span-2">
                                <Input
                                    type="text"
                                    name="Categoria"
                                    value={values.Categoria}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Proveedor" className="col-span-2">
                                <Input
                                    type="text"
                                    name="Proveedor"
                                    value={values.Proveedor}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Unidad" className="col-span-1">
                                <Input
                                    type="text"
                                    name="Unidad"
                                    value={values.Unidad}
                                    onChange={handleChange}
                                />
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
                                Guardar cambios
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default MatEditForm
