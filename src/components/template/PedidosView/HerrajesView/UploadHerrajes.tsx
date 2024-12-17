import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { Formik, Form } from 'formik'
import { FormItem, FormContainer, Input } from '@/components/ui'
import { Button } from '@/components/ui'
import CargarMaterialesButton from '../Buttons/CargarPedidoButton'

type UploadHerrajesProps = {
    onFileUpload: (data: any[][]) => void
    onClose?: () => void
}

const UploadHerrajes: React.FC<UploadHerrajesProps> = ({
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
        if (file) {
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
                    range: 6,
                }) as any[][]

                const filteredData = jsonData.map((row) => {
                    return [row[0], row[1], row[2]]
                })

                onFileUpload(filteredData)
            }
            reader.readAsArrayBuffer(file)
        } else {
            console.error('No se seleccionó ningún archivo.')
        }
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
                    <CargarMaterialesButton
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

export default UploadHerrajes
