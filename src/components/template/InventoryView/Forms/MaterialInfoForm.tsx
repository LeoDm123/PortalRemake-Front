import React from 'react'
import { Formik, Form } from 'formik'
import { Input } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import DividerMain from '@/components/template/DividerMain'
import { Material } from '@/@types/mats'
import ReceptionsList from '../Lists/ReceptionsList'

type MaterialInfoFormProps = {
    material: Material
}

const MaterialInfoForm: React.FC<MaterialInfoFormProps> = ({ material }) => {
    console.log(material)
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
            onSubmit={() => {}}
        >
            {({ values }) => (
                <Form>
                    <FormContainer>
                        <div className="flex justify-between items-center">
                            <FormItem label="Código" className="w-2/12 mr-1">
                                <Input
                                    type="text"
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
                                    value={values.Descripcion}
                                    disabled
                                />
                            </FormItem>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <FormItem label="Categoría">
                                <Input
                                    type="text"
                                    value={values.Categoria}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Proveedor">
                                <Input
                                    type="text"
                                    value={values.Proveedor}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Unidad">
                                <Input
                                    type="text"
                                    value={values.Unidad}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Stock de Seguridad">
                                <Input
                                    type="number"
                                    value={values.StockSeguridad}
                                    disabled
                                />
                            </FormItem>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <FormItem label="Alto">
                                <Input
                                    type="number"
                                    value={values.Alto}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Ancho">
                                <Input
                                    type="number"
                                    value={values.Ancho}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Largo">
                                <Input
                                    type="number"
                                    value={values.Largo}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Espesor">
                                <Input
                                    type="number"
                                    value={values.Espesor}
                                    disabled
                                />
                            </FormItem>
                        </div>

                        <>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h4
                                            id="modal-title"
                                            style={{ color: '#01662b' }}
                                        >
                                            Recepciones
                                        </h4>
                                        <DividerMain />
                                    </div>
                                </div>
                                <ReceptionsList
                                    receptions={values.Recepciones}
                                />
                            </div>
                        </>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default MaterialInfoForm
