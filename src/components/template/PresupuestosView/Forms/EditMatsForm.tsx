import React, { useState, useEffect } from 'react'
import FormItem from '@/components/ui/Form/FormItem'
import { Button, Input, Select } from '@/components/ui'
import { Material } from '@/@types/costos'
import { editCosto } from '@/api/api'
import Swal from 'sweetalert2'

interface Props {
    material: Material
    onSave?: () => void
}

const initialMaterial: Material = {
    _id: '',
    Detalle: '',
    Costo: 0,
    Unidad: '',
    Ancho: 0,
    Alto: 0,
    Espesor: 0,
    Volumen: 0,
    Unidades: 0,
    Consumo: { valor: 0, unidad: '' },
    Categoria: '',
}

const unidadOptions = [
    { value: 'm2', label: 'Metro2' },
    { value: 'lts', label: 'Litros' },
    { value: 'ml', label: 'Metro Lineal' },
    { value: 'u', label: 'Unidades' },
    { value: 'kg', label: 'Kilogramos' },
    { value: 'mLts', label: 'Mililitros' },
]

const categoriaOptions = [
    { value: 'Placa', label: 'Placa' },
    { value: 'Marco', label: 'Marco' },
    { value: 'Madera', label: 'Madera' },
    { value: 'Adhesivo', label: 'Adhesivo' },
    { value: 'Lustre', label: 'Lustre' },
    { value: 'Hidrolaqueado', label: 'Hidrolaqueado' },
    { value: 'Colocación', label: 'Colocación' },
]

const EditMatsForm: React.FC<Props> = ({ material, onSave }) => {
    const [materialEnEdicion, setMaterialEnEdicion] =
        useState<Material>(material)

    useEffect(() => {
        setMaterialEnEdicion(material)
    }, [material])

    const handleMaterialChange = (
        field: keyof Material | `Consumo.${keyof Material['Consumo']}`,
        value: any,
    ) => {
        if (field.startsWith('Consumo.')) {
            const consumoField = field.split(
                '.',
            )[1] as keyof Material['Consumo']
            setMaterialEnEdicion((prev) => ({
                ...prev,
                Consumo: {
                    ...prev.Consumo,
                    [consumoField]: value,
                },
            }))
        } else {
            setMaterialEnEdicion((prev) => ({
                ...prev,
                [field]: value,
            }))
        }
    }

    const handleSubmit = async () => {
        try {
            await editCosto('Materiales', material._id, materialEnEdicion)
            Swal.fire({
                title: '¡Éxito!',
                text: 'El material fue actualizado correctamente.',
                icon: 'success',
            })
            onSave?.()
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el material.',
                icon: 'error',
            })
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h5>Información general</h5>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <FormItem label="Detalle" className="col-span-3 my-1">
                        <Input
                            value={materialEnEdicion.Detalle}
                            onChange={(e) =>
                                handleMaterialChange('Detalle', e.target.value)
                            }
                        />
                    </FormItem>
                    <FormItem label="Categoría" className="col-span-2 my-1">
                        <Select
                            value={
                                categoriaOptions.find(
                                    (opt) =>
                                        opt.value ===
                                        materialEnEdicion.Categoria,
                                ) || null
                            }
                            options={categoriaOptions}
                            placeholder="Seleccionar categoría"
                            onChange={(opt) =>
                                handleMaterialChange(
                                    'Categoria',
                                    opt?.value || '',
                                )
                            }
                        />
                    </FormItem>
                    <FormItem label="Costo" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={materialEnEdicion.Costo}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Costo',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="mt-3">
                <div>
                    <h5>Dimensiones</h5>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <FormItem label="Unidad" className="col-span-2 my-1">
                        <Select
                            value={
                                unidadOptions.find(
                                    (opt) =>
                                        opt.value === materialEnEdicion.Unidad,
                                ) || null
                            }
                            options={unidadOptions}
                            placeholder="Unidad"
                            onChange={(opt) =>
                                handleMaterialChange('Unidad', opt?.value || '')
                            }
                        />
                    </FormItem>
                    <FormItem label="Ancho" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={materialEnEdicion.Ancho}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Ancho',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                    <FormItem label="Alto" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={materialEnEdicion.Alto}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Alto',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                    <FormItem label="Espesor" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={materialEnEdicion.Espesor}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Espesor',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                    <FormItem label="Volumen" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={materialEnEdicion.Volumen}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Volumen',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                    <FormItem label="Unidades" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={materialEnEdicion.Unidades}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Unidades',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="mt-3">
                <div>
                    <h5>Consumo</h5>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <FormItem
                        label="Consumo (valor)"
                        className="col-span-2 my-1"
                    >
                        <Input
                            type="number"
                            value={materialEnEdicion.Consumo?.valor ?? ''}
                            onChange={(e) =>
                                handleMaterialChange(
                                    'Consumo.valor',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                    <FormItem
                        label="Consumo (unidad)"
                        className="col-span-2 my-1"
                    >
                        <Select
                            value={
                                unidadOptions.find(
                                    (opt) =>
                                        opt.value ===
                                        materialEnEdicion.Consumo?.unidad,
                                ) || null
                            }
                            options={unidadOptions}
                            placeholder="Unidad"
                            onChange={(opt) =>
                                handleMaterialChange(
                                    'Consumo.unidad',
                                    opt?.value || '',
                                )
                            }
                        />
                    </FormItem>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button
                        type="button"
                        variant="solid"
                        color="green"
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditMatsForm
