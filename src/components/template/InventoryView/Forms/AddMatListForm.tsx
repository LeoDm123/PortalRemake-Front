import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Button, FormItem, FormContainer } from '@/components/ui'
import { Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import UploadMateriales from '../uploadMateriales'
import { MatUpload } from '@/@types/mats'
import { createMaterial } from '@/api/api'
import { showConfirmation, showError, showSuccess } from '@/utils/hooks/alerts'
import formatNumber from '@/utils/hooks/formatNumber'
import '../inventarioViewStyles.css'

type AddMaterialListFormProps = {
    onClose: () => void
    onSubmit: () => void
}

const AddMaterialListForm: React.FC<AddMaterialListFormProps> = ({
    onClose,
    onSubmit,
}) => {
    const [materialesData, setMaterialesData] = useState<MatUpload[]>([])

    const handleUpload = (data: MatUpload[]) => {
        setMaterialesData(data)
    }

    const handleFormSubmit = async () => {
        if (materialesData.length === 0) {
            showError('Error', 'Debes cargar al menos un material.')
            return
        }

        try {
            await Promise.all(materialesData.map((mat) => createMaterial(mat)))

            showSuccess(
                'Carga completa',
                'Los materiales fueron registrados exitosamente.',
            ).then(() => {
                setMaterialesData([])
                onClose()
                onSubmit()
            })
        } catch (error) {
            console.error('Error al cargar materiales:', error)
            showError('Error', 'Ocurrió un error al cargar algunos materiales.')
        }
    }

    const handleConfirmSubmit = () => {
        showConfirmation(
            '¿Estás seguro?',
            '¿Deseas registrar estos materiales?',
        ).then((result) => {
            if (result.isConfirmed) {
                handleFormSubmit()
            }
        })
    }

    return (
        <Formik initialValues={{}} onSubmit={handleConfirmSubmit}>
            <Form>
                <FormContainer>
                    <UploadMateriales onFileUpload={handleUpload} />

                    <Table style={{ padding: 0 }}>
                        <div className="mat-list">
                            <THead>
                                <Th>Código</Th>
                                <Th>Descripción</Th>
                                <Th>Categoría</Th>
                                <Th>Unidad</Th>
                                <Th>Stock</Th>
                                <Th>Stock Seg.</Th>
                                <Th>Costo</Th>
                                <Th>Proveedor</Th>
                            </THead>
                            <TBody>
                                {materialesData.length > 0 ? (
                                    materialesData.map((mat, index) => (
                                        <tr key={index}>
                                            <Td className="text-center">
                                                {mat.Codigo}
                                            </Td>
                                            <Td>{mat.Descripcion}</Td>
                                            <Td>{mat.Categoria}</Td>
                                            <Td className="text-center">
                                                {mat.Unidad}
                                            </Td>
                                            <Td className="text-center">
                                                {mat.Stock}
                                            </Td>
                                            <Td className="text-center">
                                                {mat.StockSeguridad}
                                            </Td>
                                            <Td className="text-center">
                                                {formatNumber(mat.Costo)}
                                            </Td>
                                            <Td>{mat.Proveedor}</Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Td colSpan={8}>
                                            No hay materiales cargados.
                                        </Td>
                                    </tr>
                                )}
                            </TBody>
                        </div>
                    </Table>

                    <Button
                        type="button"
                        onClick={handleConfirmSubmit}
                        variant="solid"
                    >
                        Registrar materiales
                    </Button>
                </FormContainer>
            </Form>
        </Formik>
    )
}

export default AddMaterialListForm
