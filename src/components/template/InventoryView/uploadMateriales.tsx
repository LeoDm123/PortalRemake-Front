import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { Formik, Form } from 'formik'
import { FormItem, FormContainer, Input } from '@/components/ui'
import { Button } from '@/components/ui'
import CargarListaButton from './Buttons/CargarListaButton'
import { MatUpload } from '@/@types/mats'

type UploadMaterialesProps = {
    onFileUpload: (data: MatUpload[]) => void
    onClose?: () => void
}

const UploadMateriales: React.FC<UploadMaterialesProps> = ({
    onFileUpload,
    onClose,
}) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string>('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
        setFileName(selectedFile ? selectedFile.name : '')
    }

    const handleFileUpload = () => {
        if (!file) {
            console.error('No se seleccionó ningún archivo.')
            return
        }

        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (!e.target?.result) return

            const data = new Uint8Array(e.target.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })

            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]

            if (!sheet) {
                console.error(
                    'No se encontró la hoja especificada en el archivo.',
                )
                return
            }

            const jsonData = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                range: 1,
            }) as any[][]

            const materiales: MatUpload[] = jsonData
                .filter((row) => row[1])
                .map((row) => ({
                    Codigo: String(row[0]),
                    Descripcion: String(row[1]),
                    Categoria: String(row[2]),
                    Unidad: String(row[3]),
                    Ancho: parseFloat(row[4]) || 0,
                    Alto: parseFloat(row[5]) || 0,
                    Largo: parseFloat(row[6]) || 0,
                    Espesor: parseFloat(row[7]) || 0,
                    Costo: parseFloat(row[8]) || 0,
                    StockSeguridad: parseInt(row[9]) || 0,
                    Stock: parseInt(row[10]) || 0,
                    Proveedor: String(row[11] || ''),
                }))

            onFileUpload(materiales)
        }

        reader.readAsArrayBuffer(file)
    }

    return (
        <Formik
            initialValues={{}}
            onSubmit={(values) => {
                console.log('Form values:', values)
            }}
        >
            <Form>
                <FormContainer className="flex items-center justify-between">
                    <FormItem label="Archivo" className="w-10/12 mx-2">
                        <Input type="text" value={fileName} disabled />
                    </FormItem>
                    <CargarListaButton
                        size="medium"
                        onChange={handleFileChange}
                    />
                    <Button
                        type="button"
                        onClick={handleFileUpload}
                        variant="twoTone"
                    >
                        Cargar archivo
                    </Button>
                </FormContainer>
            </Form>
        </Formik>
    )
}

export default UploadMateriales
