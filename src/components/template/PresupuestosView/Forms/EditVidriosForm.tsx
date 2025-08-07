import React, { useState, useEffect } from 'react'
import FormItem from '@/components/ui/Form/FormItem'
import { Button, Input, Select } from '@/components/ui'
import { Vidrios } from '@/@types/costos'
import { editCosto } from '@/api/api'
import Swal from 'sweetalert2'

interface Props {
    vidrio: Vidrios
    onSave?: () => void
}

const unidadOptions = [
    { value: 'm2', label: 'Metro2' },
    { value: 'ml', label: 'Metro Lineal' },
    { value: 'u', label: 'Unidades' },
]

const EditVidriosForm: React.FC<Props> = ({ vidrio, onSave }) => {
    const [vidrioEnEdicion, setVidrioEnEdicion] = useState<Vidrios>(vidrio)

    useEffect(() => {
        setVidrioEnEdicion(vidrio)
    }, [vidrio])

    const handleVidrioChange = (field: keyof Vidrios, value: any) => {
        setVidrioEnEdicion((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            await editCosto('Vidrios', vidrio._id, vidrioEnEdicion)
            Swal.fire({
                title: '¡Éxito!',
                text: 'El vidrio fue actualizado correctamente.',
                icon: 'success',
            })
            onSave?.()
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el vidrio.',
                icon: 'error',
            })
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h5>Información del Vidrio</h5>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <FormItem label="Código" className="col-span-3 my-1">
                        <Input
                            value={vidrioEnEdicion.Codigo}
                            onChange={(e) =>
                                handleVidrioChange('Codigo', e.target.value)
                            }
                        />
                    </FormItem>
                    <FormItem label="Detalle" className="col-span-4 my-1">
                        <Input
                            value={vidrioEnEdicion.Detalle}
                            onChange={(e) =>
                                handleVidrioChange('Detalle', e.target.value)
                            }
                        />
                    </FormItem>
                    <FormItem label="Costo" className="col-span-2 my-1">
                        <Input
                            type="number"
                            value={vidrioEnEdicion.Costo}
                            onChange={(e) =>
                                handleVidrioChange(
                                    'Costo',
                                    Number(e.target.value),
                                )
                            }
                            min={0}
                        />
                    </FormItem>
                    <FormItem label="Unidad" className="col-span-3 my-1">
                        <Select
                            value={
                                unidadOptions.find(
                                    (opt) =>
                                        opt.value === vidrioEnEdicion.Unidad,
                                ) || null
                            }
                            options={unidadOptions}
                            placeholder="Unidad"
                            onChange={(opt) =>
                                handleVidrioChange('Unidad', opt?.value || '')
                            }
                        />
                    </FormItem>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button
                    type="button"
                    variant="solid"
                    color="green"
                    onClick={handleSubmit}
                >
                    Guardar Cambios
                </Button>
            </div>
        </div>
    )
}

export default EditVidriosForm
