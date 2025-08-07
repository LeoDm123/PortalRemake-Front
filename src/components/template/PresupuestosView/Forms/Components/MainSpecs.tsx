import React, { useMemo, useState, useEffect } from 'react'
import FormItem from '@/components/ui/Form/FormItem'
import { Input, Select } from '@/components/ui'
import { Field, FieldProps } from 'formik'
import {
    hoja,
    marcos,
    terminaciones,
    apliques,
} from '@/constants/presupuestos.constant'
import { Puerta } from '@/@types/presupuesto'
import SpecSwitchers from './SpecSwitchers'
import { fetchCostos } from '@/api/api'
import { Material } from '@/@types/costos'

interface Props {
    puerta: Puerta
    handlePuertaChange: (field: keyof Puerta, value: any) => void
}

const MainSpecs: React.FC<Props> = ({ puerta, handlePuertaChange }) => {
    const [materiales, setMateriales] = useState<Material[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMateriales = async () => {
            try {
                const response = await fetchCostos()
                if (response && response.ok && response.costos) {
                    const materiales = response.costos[0]?.Materiales || []
                    setMateriales(materiales)
                }
            } catch (error) {
                console.error('Error al cargar los materiales:', error)
            } finally {
                setLoading(false)
            }
        }
        loadMateriales()
    }, [])

    const placaOptions = useMemo(() => {
        return materiales
            .filter((material) => material.Categoria === 'Placa')
            .map((material) => ({
                value: material.Detalle,
                label: material.Detalle,
            }))
    }, [materiales])

    return (
        <div>
            <div className="grid grid-cols-12 gap-2">
                <FormItem label="Nombre" className="col-span-1 my-1">
                    <Input
                        value={puerta.Nombre}
                        onChange={(e) =>
                            handlePuertaChange('Nombre', e.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Ancho [mm]" className="col-span-2  my-1">
                    <Input
                        type="number"
                        value={puerta.Ancho}
                        onChange={(e) =>
                            handlePuertaChange('Ancho', Number(e.target.value))
                        }
                    />
                </FormItem>
                <FormItem label="Alto [mm]" className="col-span-2  my-1">
                    <Input
                        type="number"
                        value={puerta.Alto}
                        onChange={(e) =>
                            handlePuertaChange('Alto', Number(e.target.value))
                        }
                    />
                </FormItem>
                <FormItem label="Cantidad" className="col-span-1  my-1">
                    <Input
                        type="number"
                        value={puerta.Cantidad}
                        onChange={(e) =>
                            handlePuertaChange(
                                'Cantidad',
                                Number(e.target.value),
                            )
                        }
                    />
                </FormItem>
                <FormItem label="Marco" className="col-span-3 my-1">
                    <Select
                        value={
                            marcos.find((opt) => opt.value === puerta.Marco) ||
                            null
                        }
                        options={marcos}
                        placeholder="Seleccionar sección"
                        onChange={(option) =>
                            handlePuertaChange('Marco', option?.value || '')
                        }
                    />
                </FormItem>
                <FormItem label="Hoja" className="col-span-3 my-1">
                    <Select
                        value={
                            hoja.find((opt) => opt.value === puerta.Hoja) ||
                            null
                        }
                        options={hoja}
                        placeholder="Seleccionar hoja"
                        onChange={(option) =>
                            handlePuertaChange('Hoja', option?.value || '')
                        }
                    />
                </FormItem>
            </div>
            <div className="grid grid-cols-10 gap-2">
                <FormItem label="Placa" className="col-span-3 my-1">
                    <Select
                        value={
                            placaOptions.find(
                                (opt) => opt.value === puerta.Placa,
                            ) || null
                        }
                        options={placaOptions}
                        placeholder="Seleccionar placa"
                        onChange={(option) =>
                            handlePuertaChange('Placa', option?.value || '')
                        }
                        isLoading={loading}
                    />
                </FormItem>
                <FormItem label="Terminación" className="col-span-3 my-1">
                    <Select
                        value={
                            terminaciones.find(
                                (opt) => opt.value === puerta.Terminacion,
                            ) || null
                        }
                        options={terminaciones}
                        placeholder="Seleccionar terminación"
                        onChange={(option) =>
                            handlePuertaChange(
                                'Terminacion',
                                option?.value || '',
                            )
                        }
                    />
                </FormItem>
                <FormItem label="Aplique" className="col-span-3 my-1">
                    <Select
                        value={
                            apliques.find(
                                (opt) => opt.value === puerta.Apliques,
                            ) || null
                        }
                        options={apliques}
                        placeholder="Seleccionar apliques"
                        onChange={(option) =>
                            handlePuertaChange('Apliques', option?.value || '')
                        }
                    />
                </FormItem>
                <div className="col-span-12 my-1">
                    <SpecSwitchers
                        puertaEnEdicion={puerta}
                        handlePuertaChange={handlePuertaChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainSpecs
