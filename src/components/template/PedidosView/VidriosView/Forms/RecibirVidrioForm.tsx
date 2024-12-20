import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Input, Button } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import VidriosReceptionList from '../Lists/VidriosReceptionList'
import { RecibirPedidoVidrios } from '@/api/api'
import DividerMain from '@/components/template/DividerMain'
import { Vidrio } from '@/@types/pedidos'
import { showConfirmation, showError, showSuccess } from '@/utils/hooks/alerts'

type RecibirVidrioFormProps = {
    vidrio: Vidrio
    pedidoId: string
    nroPedido: string
    onSubmit: (values: any) => void
    closeModal: () => void
}

const RecibirVidrioForm: React.FC<RecibirVidrioFormProps> = ({
    vidrio,
    pedidoId,
    nroPedido,
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
                Tipologia: vidrio.Tipologia,
                CantEntrega: vidrio.Cantidad,
                Composicion: vidrio.Composicion,
                Ancho: vidrio.Ancho,
                Alto: vidrio.Alto,
                Cantidad: vidrio.Cantidad,
                CantRecibida: 0,
                FechaRecep: new Date().toISOString().split('T')[0],
                NroRemito: '',
                nroPedido: nroPedido,
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

                const RemitoLog = `Remito N°: ${values.NroRemito}`

                try {
                    const response = await RecibirPedidoVidrios(
                        pedidoId,
                        vidrio.Codigo,
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
                            <FormItem label="Tipologia" className="w-2/12">
                                <Input
                                    type="text"
                                    value={values.Tipologia}
                                    disabled
                                />
                            </FormItem>

                            <FormItem label="Ancho" className="w-2/12">
                                <Input
                                    type="text"
                                    value={values.Ancho}
                                    disabled
                                />
                            </FormItem>
                            <FormItem label="Alto" className="w-2/12">
                                <Input
                                    type="text"
                                    value={values.Alto}
                                    disabled
                                />
                            </FormItem>
                            <FormItem label="Composicion" className="w-3/12">
                                <Input
                                    type="text"
                                    value={values.Composicion}
                                    disabled
                                />
                            </FormItem>
                            <FormItem
                                label="Cant. a Entregar"
                                className="w-2/12 "
                            >
                                <Input
                                    type="text"
                                    value={values.Cantidad}
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
                            <VidriosReceptionList
                                recepciones={vidrio.Recepciones}
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

export default RecibirVidrioForm
