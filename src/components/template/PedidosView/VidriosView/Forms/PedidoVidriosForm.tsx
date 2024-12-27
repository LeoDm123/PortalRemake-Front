import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Input, Button } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import UploadVidrios from '../UploadVidrios'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { createPedidoVidrios } from '@/api/api'
import getCurrentDate from '@/utils/hooks/getCurrentDate'
import { showConfirmation, showSuccess, showError } from '@/utils/hooks/alerts'
import '../../pedidosViewStyles.css'
import formatNumber from '@/utils/hooks/formatNumber'

type UploadedMaterial = {
    Codigo: string
    Tipologia: string
    Ancho: number
    Alto: number
    Cantidad: number
    Composicion: string
    Recepciones: any[]
}

type PedidoVidriosFormProps = {
    onClose: () => void
    onSubmit: () => void
}

const PedidoVidriosForm: React.FC<PedidoVidriosFormProps> = ({
    onClose,
    onSubmit,
}) => {
    const Today = getCurrentDate()
    const [uploadedData, setUploadedData] = useState<UploadedMaterial[]>([])
    const [NroPedido, setNroPedido] = useState('')
    const [Obra, setObra] = useState('')
    const [Fecha, setFecha] = useState(Today)
    const [Cliente, setCliente] = useState('')
    const [Estado, setEstado] = useState('Abierto')

    const handleFileUpload = async (
        jsonData: (string | number | undefined | null)[][],
    ) => {
        const dataToUpload: UploadedMaterial[] = jsonData
            .filter((row) =>
                row.every(
                    (cell: string | number | undefined | null) =>
                        cell !== undefined && cell !== null && cell !== '',
                ),
            )
            .map(([Tipologia, Ancho, Alto, Cantidad, Composicion]) => ({
                Codigo: Tipologia + '-' + Ancho + '-' + Alto,
                Tipologia: String(Tipologia),
                Ancho: Number(Ancho),
                Alto: Number(Alto),
                Cantidad: Number(Cantidad),
                Composicion: String(Composicion),
                Recepciones: [],
            }))

        setUploadedData(dataToUpload)
    }

    const handleConfirmSubmit = (submit: () => void) => {
        showConfirmation(
            '¿Estás seguro?',
            '¿Deseas registrar este pedido?',
        ).then((result) => {
            if (result.isConfirmed) {
                submit()
            }
        })
    }

    const handleSuccess = () => {
        showSuccess(
            'Pedido registrado',
            'El pedido se ha registrado correctamente.',
        ).then(() => {
            onClose()
        })
    }

    const handleFormSubmit = async () => {
        if (!Obra || !NroPedido || !Cliente || !Fecha) {
            showError('Error', 'Todos los campos son obligatorios.')
            return
        }

        try {
            await createPedidoVidrios(
                Cliente,
                Obra,
                Fecha,
                NroPedido,
                Estado,
                uploadedData,
            )
            handleSuccess()
            setUploadedData([])
            setObra('')
            setFecha(Today)
            setNroPedido('')
            setCliente('')
            onSubmit()
        } catch (error) {
            console.error('Error al crear el pedido:', error)
            showError('Error', 'No se pudo registrar el pedido.')
        }
    }

    return (
        <Formik
            initialValues={{
                Cliente: '',
                Obra: '',
                Fecha: Today,
                NroPedido: '',
                Estado: 'Abierto',
                materiales: [],
            }}
            onSubmit={() => handleConfirmSubmit(handleFormSubmit)}
        >
            {({ handleSubmit }) => (
                <Form>
                    <FormContainer>
                        <div className="flex items-center">
                            <FormItem label="Cliente" className="w-4/12 mr-2">
                                <Input
                                    type="text"
                                    name="Cliente"
                                    value={Cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                />
                            </FormItem>
                            <FormItem
                                label="Nombre de la Obra"
                                className="w-4/12 mr-2"
                            >
                                <Input
                                    type="text"
                                    name="Obra"
                                    value={Obra}
                                    onChange={(e) => setObra(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Nro. de Pedido" className="w-4/12">
                                <Input
                                    type="text"
                                    name="NroPedido"
                                    value={NroPedido}
                                    onChange={(e) =>
                                        setNroPedido(e.target.value)
                                    }
                                />
                            </FormItem>
                        </div>

                        <div className="flex items-center mb-4">
                            <FormItem label="Fecha de Pedido" className="w-1/4">
                                <Input
                                    type="date"
                                    name="Fecha"
                                    value={Fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </FormItem>
                            <div className="w-3/4">
                                <UploadVidrios
                                    onFileUpload={handleFileUpload}
                                    onClose={onClose}
                                />
                            </div>
                        </div>
                    </FormContainer>

                    <Table style={{ padding: 0 }}>
                        <div className="mat-list bg-gray-200">
                            <THead>
                                <Th className="text-center w-1/5 bg-gray-300">
                                    Tipología
                                </Th>
                                <Th className="text-center w-1/5">Ancho</Th>
                                <Th className="text-center w-1/5">Alto</Th>
                                <Th className="text-center w-1/5">Cantidad</Th>
                                <Th className="text-center w-1/5">
                                    Composición
                                </Th>
                            </THead>
                            <TBody>
                                {uploadedData.length > 0 ? (
                                    uploadedData.map((material, index) => (
                                        <tr key={index}>
                                            <Td className="text-center w-1/5">
                                                {material.Tipologia}
                                            </Td>
                                            <Td className="text-center w-1/5">
                                                {material.Ancho}
                                            </Td>
                                            <Td className="text-center w-1/5">
                                                {material.Alto}
                                            </Td>
                                            <Td className="text-center w-1/5">
                                                {material.Cantidad}
                                            </Td>
                                            <Td className="text-center w-1/5">
                                                {material.Composicion}
                                            </Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Td colSpan={5}>
                                            No hay materiales cargados.
                                        </Td>
                                    </tr>
                                )}
                            </TBody>
                        </div>
                    </Table>

                    <Button
                        type="button"
                        onClick={() => handleConfirmSubmit(handleSubmit)}
                        variant="solid"
                    >
                        Registrar Pedido
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default PedidoVidriosForm
