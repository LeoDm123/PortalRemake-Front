import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Input } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import VidriosReceptionList from '../Lists/VidriosReceptionList'
import { Vidrio } from '@/@types/pedidos'

type PedidoVidriosInfoFormProps = {
    vidrio: Vidrio
}

const PedidoVidriosInfoForm: React.FC<PedidoVidriosInfoFormProps> = ({
    vidrio,
}) => {
    return (
        <Formik
            initialValues={{
                Tipologia: vidrio.Tipologia,
                Ancho: vidrio.Ancho,
                Alto: vidrio.Alto,
                Composicion: vidrio.Composicion,
                CantPedida: vidrio.Cantidad,
            }}
            onSubmit={(values) => {
                console.log('Form values:', values)
            }}
        >
            {({ values }) => (
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
                                    value={values.CantPedida}
                                    disabled
                                />
                            </FormItem>
                        </div>

                        <div className="mt-4">
                            <h4 id="modal-title" style={{ color: '#01662b' }}>
                                Recepciones
                            </h4>
                            <VidriosReceptionList
                                recepciones={vidrio.Recepciones}
                            />
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default PedidoVidriosInfoForm
