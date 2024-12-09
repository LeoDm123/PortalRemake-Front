import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Input, Button } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import PerfilesReceptionList from '../Lists/PerfilesReceptionList'
import { RecibirPedidoPerfiles } from '@/api/api'
import DividerMain from '@/components/template/DividerMain'
import { showConfirmation, showSuccess, showError } from '@/utils/hooks/alerts'
import { Material } from '@/@types/pedidos'

type RecibirMaterialFormProps = {
    material: Material
    pedidoId: string
    onSubmit: (values: any) => void
    closeModal: () => void
}

const RecibirMaterialForm: React.FC<RecibirMaterialFormProps> = ({
    material,
    pedidoId,
    onSubmit,
    closeModal,
}) => {
    const handleConfirmSubmit = (submit: () => void) => {
        showConfirmation(
            '¿Estás seguro?',
            '¿Deseas registrar esta recepción?',
        ).then((result) => {
            if (result.isConfirmed) {
                submit()
            }
        })
    }

    const handleSuccess = () => {
        showSuccess(
            'Recepción registrada',
            'La recepción se ha registrado correctamente.',
        ).then(() => {
            closeModal()
        })
    }

    return (
        <Formik
            initialValues={{
                Codigo: material.Codigo,
                CantPedida: material.CantPedida,
                CantEntrega: material.CantEntrega,
                Descripcion: material.Descripcion,
                Unidad: material.Unidad,
                CantRecibida: 0,
                FechaRecep: new Date().toISOString().split('T')[0],
                NroRemito: '',
                TipoMov: 'Ingreso',
            }}
            onSubmit={async (values, { resetForm }) => {
                if (
                    !values.CantRecibida ||
                    !values.FechaRecep ||
                    !values.NroRemito
                ) {
                    showError('Error', 'Todos los campos son obligatorios.')
                    return
                }

                const nroPedido = material.Recepciones[0]?.nroPedido || ''
                const RemitoLog = `Remito N°: ${values.NroRemito}`

                try {
                    const response = await RecibirPedidoPerfiles(
                        pedidoId,
                        material.Codigo,
                        {
                            ...values,
                            nroPedido,
                            RemitoLog,
                        },
                    )

                    resetForm()
                    handleSuccess()
                    onSubmit(response)
                } catch (error: unknown) {
                    console.error(error)

                    let errorMessage = 'Error desconocido'
                    if (error instanceof Error) {
                        errorMessage = error.message
                    }

                    showError('Error', errorMessage)
                }
            }}
        >
            {({ values, handleChange, handleSubmit }) => (
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

                        <div className="flex items-center">
                            <FormItem
                                label="Cant. Pedida"
                                className="w-3/12 mr-1"
                            >
                                <Input
                                    type="number"
                                    value={values.CantPedida}
                                    disabled
                                />
                            </FormItem>

                            <FormItem
                                label="Cant. a Entregar"
                                className="w-3/12 mx-1"
                            >
                                <Input
                                    type="number"
                                    value={values.CantEntrega}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Unidad" className="w-3/12 mx-1">
                                <Input
                                    type="text"
                                    value={values.Unidad}
                                    disabled
                                />
                            </FormItem>

                            <FormItem
                                label="Total Recibido"
                                className="w-3/12 ml-1"
                            >
                                <Input
                                    type="number"
                                    value={material.Recepciones.reduce(
                                        (acc, recep) =>
                                            acc + recep.CantRecibida,
                                        0,
                                    )}
                                    disabled
                                />
                            </FormItem>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4
                                        id="modal-title"
                                        style={{ color: '#01662b' }}
                                    >
                                        Registrar recepción
                                    </h4>
                                    <DividerMain />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FormItem
                                    label="Cant. Recibida"
                                    className="w-3/12 mr-1"
                                >
                                    <Field
                                        as={Input}
                                        type="number"
                                        name="CantRecibida"
                                        onChange={handleChange}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Fecha de Recepción"
                                    className="w-4/12 mx-1"
                                >
                                    <Field
                                        as={Input}
                                        type="date"
                                        name="FechaRecep"
                                        onChange={handleChange}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Nro. Remito"
                                    className="w-5/12 mx-1"
                                >
                                    <Field
                                        as={Input}
                                        type="text"
                                        name="NroRemito"
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4
                                        id="modal-title"
                                        style={{ color: '#01662b' }}
                                    >
                                        Recepciones anteriores
                                    </h4>
                                    <DividerMain />
                                </div>
                            </div>
                            <PerfilesReceptionList
                                recepciones={material.Recepciones}
                            />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                type="button"
                                onClick={() =>
                                    handleConfirmSubmit(() => handleSubmit())
                                }
                                variant="solid"
                            >
                                Registrar Recepción
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default RecibirMaterialForm
