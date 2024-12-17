import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Input, Button } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import UploadHerrajes from '../UploadHerrajes'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { createPedidoHerrajes } from '@/api/api'
import getCurrentDate from '@/utils/hooks/getCurrentDate'
import { showConfirmation, showSuccess, showError } from '@/utils/hooks/alerts'
import '../../pedidosViewStyles.css'
import formatNumber from '@/utils/hooks/formatNumber'

type UploadedMaterial = {
    Codigo: string
    Descripcion: string
    CantEntrega: number
    Unidad: string
    Recepciones: any[]
}

type PedidoHerrajesFormProps = {
    onClose: () => void
    onSubmit: () => void
}

const PedidoHerrajesForm: React.FC<PedidoHerrajesFormProps> = ({
    onClose,
    onSubmit,
}) => {
    const Today = getCurrentDate()
    const [uploadedData, setUploadedData] = useState<UploadedMaterial[]>([])
    const [NroPedido, setNroPedido] = useState('')
    const [Obra, setObra] = useState('')
    const [Fecha, setFecha] = useState(Today)
    const [OrdenCompra, setOrdenCompra] = useState('')
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
            .map(([Codigo, Descripcion, CantEntrega, Unidad]) => ({
                Codigo: String(Codigo),
                Descripcion: String(Descripcion),
                CantEntrega: Number(CantEntrega),
                Unidad: 'u.',
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
        if (!Obra || !NroPedido || !OrdenCompra || !Fecha) {
            showError('Error', 'Todos los campos son obligatorios.')
            return
        }

        try {
            await createPedidoHerrajes(
                Obra,
                Fecha,
                NroPedido,
                OrdenCompra,
                Estado,
                uploadedData,
            )
            handleSuccess()
            setUploadedData([])
            setObra('')
            setFecha(Today)
            setNroPedido('')
            setOrdenCompra('')
            onSubmit()
        } catch (error) {
            console.error('Error al crear el pedido:', error)
            showError('Error', 'No se pudo registrar el pedido.')
        }
    }

    return (
        <Formik
            initialValues={{
                Obra: '',
                Fecha: Today,
                NroPedido: '',
                OrdenCompra: '',
                Estado: 'Abierto',
                materiales: [],
            }}
            onSubmit={() => handleConfirmSubmit(handleFormSubmit)}
        >
            {({ handleSubmit }) => (
                <Form>
                    <FormContainer>
                        <div className="flex items-center">
                            <FormItem
                                label="Nombre de la Obra"
                                className="w-3/4 mr-4"
                            >
                                <Input
                                    type="text"
                                    name="Obra"
                                    value={Obra}
                                    onChange={(e) => setObra(e.target.value)}
                                />
                            </FormItem>
                            <FormItem
                                label="Nro. de Pedido"
                                className="w-1/2 mr-4"
                            >
                                <Input
                                    type="text"
                                    name="NroPedido"
                                    value={NroPedido}
                                    onChange={(e) =>
                                        setNroPedido(e.target.value)
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="Nro. de Orden de Compra"
                                className="w-1/2"
                            >
                                <Input
                                    type="text"
                                    name="OrdenCompra"
                                    value={OrdenCompra}
                                    onChange={(e) =>
                                        setOrdenCompra(e.target.value)
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
                                <UploadHerrajes
                                    onFileUpload={handleFileUpload}
                                    onClose={onClose}
                                />
                            </div>
                        </div>
                    </FormContainer>

                    <Table style={{ padding: 0 }}>
                        <div className="mat-list">
                            <THead>
                                <Th className="text-center w-2/12">Código</Th>
                                <Th className="text-center w-4/12">
                                    Descripción
                                </Th>
                                <Th className="text-center w-2/12">
                                    Cant. a Entregar
                                </Th>
                                <Th className="text-center w-2/12">
                                    Unidad de Medida
                                </Th>
                            </THead>
                            <TBody>
                                {uploadedData.length > 0 ? (
                                    uploadedData.map((material, index) => (
                                        <tr key={index}>
                                            <Td className="text-center w-2/12">
                                                {material.Codigo}
                                            </Td>
                                            <Td className="w-4/12">
                                                {material.Descripcion}
                                            </Td>

                                            <Td className="text-center w-2/12 p-0">
                                                {material.CantEntrega}
                                            </Td>
                                            <Td className="text-center w-2/12">
                                                {material.Unidad}
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

export default PedidoHerrajesForm
