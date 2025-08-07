import React from 'react'
import { Drawer } from '@/components/ui'
import { Button } from '@/components/ui'
import MainSpecs from '../Forms/Components/MainSpecs'
import ExtraSpecs from '../Forms/Components/ExtraSpecs'
import { Puerta, Vidrio, PañoFijo } from '@/@types/presupuesto'
import '../presupuestosViewStyles.css'
import PañoFijoSpecs from '../Forms/Components/PañoFijoSpecs'

interface Props {
    open: boolean
    onClose: () => void
    puerta: Puerta
    handlePuertaChange: (field: keyof Puerta, value: any) => void
    handleVidrioChange: (field: keyof Vidrio, value: any) => void
    agregarPuerta: () => void
}

const PuertaDrawer: React.FC<Props> = ({
    open,
    onClose,
    puerta,
    handlePuertaChange,
    handleVidrioChange,
    agregarPuerta,
}) => {
    const handleAddPañoFijo = () => {
        const currentPañosFijos = puerta.PañoFijo || []
        const newPañoFijo: PañoFijo = {
            Posicion: '',
            Ancho: 0,
            Alto: 0,
            Vidrio: '',
        }
        handlePuertaChange('PañoFijo', [...currentPañosFijos, newPañoFijo])
    }

    const handleRemovePañoFijo = (index: number) => {
        const currentPañosFijos = puerta.PañoFijo || []
        const newPañosFijos = currentPañosFijos.filter((_, i) => i !== index)
        handlePuertaChange('PañoFijo', newPañosFijos)
    }

    const handlePañoFijoChange = (field: keyof Puerta, value: any) => {
        handlePuertaChange(field, value)
    }

    return (
        <Drawer
            isOpen={open}
            onClose={onClose}
            title="Agregar Puerta"
            placement="right"
            width={'60%'}
            footer={
                <Button
                    type="button"
                    variant="solid"
                    color="green"
                    onClick={() => {
                        agregarPuerta()
                        onClose()
                    }}
                    className="mt-4 w-full"
                >
                    Agregar Puerta
                </Button>
            }
        >
            <MainSpecs
                puerta={puerta}
                handlePuertaChange={handlePuertaChange}
            />
            <ExtraSpecs
                puerta={puerta}
                handleVidrioChange={handleVidrioChange}
                handlePuertaChange={handlePuertaChange}
            />
            <PañoFijoSpecs
                puerta={puerta}
                handlePuertaChange={handlePañoFijoChange}
                handleAddPañoFijo={handleAddPañoFijo}
                handleRemovePañoFijo={handleRemovePañoFijo}
            />
        </Drawer>
    )
}

export default PuertaDrawer
