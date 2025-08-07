import React from 'react'
import { FormItem, Input, Select, Button } from '@/components/ui'
import { vidrios, posicionesPañoFijo } from '@/constants/presupuestos.constant'
import { Puerta, PañoFijo } from '@/@types/presupuesto'
import DeleteButton from '@/components/template/DeleteButton'
import '../../presupuestosViewStyles.css'

interface Props {
    puerta: Puerta
    handlePuertaChange: (field: keyof Puerta, value: any) => void
    handleAddPañoFijo: () => void
    handleRemovePañoFijo: (index: number) => void
}

const PañoFijoSpecs: React.FC<Props> = ({
    puerta,
    handlePuertaChange,
    handleAddPañoFijo,
    handleRemovePañoFijo,
}) => {
    const pañosFijos = Array.isArray(puerta.PañoFijo) ? puerta.PañoFijo : []

    return (
        <div className="mt-1">
            <Button variant="solid" size="sm" onClick={handleAddPañoFijo}>
                + Agregar Paño Fijo
            </Button>

            {pañosFijos.map((paño: PañoFijo, index: number) => (
                <div key={index} className="PFContainer">
                    <div className="grid grid-cols-10 gap-2 relative">
                        <FormItem label="Posición" className="col-span-2 my-1">
                            <Select
                                placeholder="Seleccionar posición"
                                value={
                                    posicionesPañoFijo.find(
                                        (opt) => opt.value === paño.Posicion,
                                    ) || null
                                }
                                options={posicionesPañoFijo}
                                onChange={(option) => {
                                    const newPañosFijos = [...pañosFijos]
                                    newPañosFijos[index] = {
                                        ...paño,
                                        Posicion: option?.value || '',
                                    }
                                    handlePuertaChange(
                                        'PañoFijo',
                                        newPañosFijos,
                                    )
                                }}
                            />
                        </FormItem>

                        <FormItem
                            label="Ancho [mm]"
                            className="col-span-2 my-1"
                        >
                            <Input
                                type="number"
                                value={paño.Ancho}
                                onChange={(e) => {
                                    const newPañosFijos = [...pañosFijos]
                                    newPañosFijos[index] = {
                                        ...paño,
                                        Ancho: Number(e.target.value),
                                    }
                                    handlePuertaChange(
                                        'PañoFijo',
                                        newPañosFijos,
                                    )
                                }}
                            />
                        </FormItem>

                        <FormItem label="Alto [mm]" className="col-span-2 my-1">
                            <Input
                                type="number"
                                value={paño.Alto}
                                onChange={(e) => {
                                    const newPañosFijos = [...pañosFijos]
                                    newPañosFijos[index] = {
                                        ...paño,
                                        Alto: Number(e.target.value),
                                    }
                                    handlePuertaChange(
                                        'PañoFijo',
                                        newPañosFijos,
                                    )
                                }}
                            />
                        </FormItem>

                        <FormItem
                            label="Tipo de vidrio"
                            className="col-span-4 my-1"
                        >
                            <Select
                                placeholder="Seleccionar vidrio"
                                value={
                                    vidrios.find(
                                        (opt) => opt.value === paño.Vidrio,
                                    ) || null
                                }
                                options={vidrios}
                                onChange={(option) => {
                                    const newPañosFijos = [...pañosFijos]
                                    newPañosFijos[index] = {
                                        ...paño,
                                        Vidrio: option?.value || '',
                                    }
                                    handlePuertaChange(
                                        'PañoFijo',
                                        newPañosFijos,
                                    )
                                }}
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-1 mt-6">
                        <DeleteButton
                            size="medium"
                            onDelete={() => handleRemovePañoFijo(index)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PañoFijoSpecs
