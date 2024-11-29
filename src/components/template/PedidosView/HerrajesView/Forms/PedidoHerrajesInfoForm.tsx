import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Input } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import HerrajesReceptionList from '../Lists/HerrajesReceptionList'

type PedidoHerrajesInfoFormProps = {
    material: {
        Codigo: string
        CantPedida: number
        CantEntrega: number
        Descripcion: string
        Unidad: string
        Recepciones: {
            CantRecibida: number
            FechaRecep: string
            nroPedido: string
            NroRemito: string
            Unidad: string
            TipoMov: string
            RemitoLog: string
        }[]
    }
}

const PedidoHerrajesInfoForm: React.FC<PedidoHerrajesInfoFormProps> = ({
    material,
}) => {
    return (
        <Formik
            initialValues={{
                Codigo: material.Codigo,
                CantPedida: material.CantPedida,
                CantEntrega: material.CantEntrega,
                Descripcion: material.Descripcion,
                Unidad: material.Unidad,
            }}
            onSubmit={(values) => {
                console.log('Form values:', values)
            }}
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

                        <div className="flex  items-center">
                            <FormItem
                                label="Cant. Pedida"
                                className="w-2/12 mr-1"
                            >
                                <Input
                                    type="number"
                                    value={values.CantPedida}
                                    disabled
                                />
                            </FormItem>

                            <FormItem
                                label="Cant. a Entregar"
                                className="w-2/12 mx-1"
                            >
                                <Input
                                    type="number"
                                    value={values.CantEntrega}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Unidad" className="w-2/12 mx-1">
                                <Input
                                    type="text"
                                    value={values.Unidad}
                                    disabled
                                />
                            </FormItem>

                            <FormItem
                                label="Total Recibido"
                                className="w-2/12 ml-1"
                            >
                                <Input
                                    type="number"
                                    value={values.CantEntrega}
                                    disabled
                                />
                            </FormItem>
                        </div>

                        <div className="mt-4">
                            <h4>Recepciones</h4>
                            <HerrajesReceptionList
                                recepciones={material.Recepciones}
                            />
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default PedidoHerrajesInfoForm
