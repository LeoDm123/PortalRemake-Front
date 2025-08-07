import React, { useState, useEffect } from 'react'
import FormItem from '@/components/ui/Form/FormItem'
import { Button, Input, Select } from '@/components/ui'
import {
    Material,
    Parametro,
    ManoObra,
    CostoFijo,
    Margenes,
} from '@/@types/costos'
import { editCosto, editCostoObject } from '@/api/api'
import Swal from 'sweetalert2'
import { meses } from '@/constants/presupuestos.constant'

interface Props {
    parametros?: Parametro[]
    manoObra?: ManoObra
    margenes?: Margenes
    costosFijos?: CostoFijo[]
    onSave?: () => void
}

const cobroOptions = [
    { value: 'Mensual', label: 'Mensual' },
    { value: 'Bimestral', label: 'Bimestral' },
    { value: 'Trimestral', label: 'Trimestral' },
]

const generarAnoOptions = () => {
    const anoActual = new Date().getFullYear()
    const opciones = []
    for (let i = 0; i <= 20; i++) {
        const ano = anoActual + i
        opciones.push({ value: ano.toString(), label: ano.toString() })
    }
    return opciones
}

const anoOptions = generarAnoOptions()

const EditParamsForm: React.FC<Props> = ({
    parametros = [],
    manoObra,
    margenes,
    costosFijos = [],
    onSave,
}) => {
    const [parametrosEnEdicion, setParametrosEnEdicion] =
        useState<Parametro[]>(parametros)
    const [manoObraEnEdicion, setManoObraEnEdicion] = useState<ManoObra | null>(
        manoObra || null,
    )
    const [costosFijosEnEdicion, setCostosFijosEnEdicion] =
        useState<CostoFijo[]>(costosFijos)
    const [margenesEnEdicion, setMargenesEnEdicion] = useState<Margenes | null>(
        margenes || null,
    )
    // Estados para manejar mes y año de mano de obra
    const [mesSeleccionado, setMesSeleccionado] = useState<string>('')
    const [anoSeleccionado, setAnoSeleccionado] = useState<string>('')

    // Estados para tracking de cambios
    const [parametrosCambiados, setParametrosCambiados] = useState<Set<string>>(
        new Set(),
    )
    const [manoObraCambiada, setManoObraCambiada] = useState<boolean>(false)
    const [costosFijosCambiados, setCostosFijosCambiados] = useState<
        Set<string>
    >(new Set())
    const [margenesCambiados, setMargenesCambiados] = useState<boolean>(false)

    useEffect(() => {
        setParametrosEnEdicion(parametros)
        setManoObraEnEdicion(manoObra || null)
        setCostosFijosEnEdicion(costosFijos)

        // Inicializar mes y año si existe mano de obra
        if (manoObra?.Fecha) {
            // Verificar si la fecha está en formato MM/AAAA
            if (manoObra.Fecha.includes('/')) {
                const [mes, ano] = manoObra.Fecha.split('/')
                // Convertir mes con padding a formato sin padding para coincidir con las constantes
                const mesSinPadding = parseInt(mes).toString()
                setMesSeleccionado(mesSinPadding)
                setAnoSeleccionado(ano)
            } else {
                // Si está en formato ISO, convertir
                const fecha = new Date(manoObra.Fecha)
                setMesSeleccionado((fecha.getMonth() + 1).toString())
                setAnoSeleccionado(fecha.getFullYear().toString())
            }
        } else {
            // Valores por defecto
            setMesSeleccionado((new Date().getMonth() + 1).toString())
            setAnoSeleccionado(new Date().getFullYear().toString())
        }
    }, [parametros, manoObra, costosFijos])

    const handleParametroChange = (
        index: number,
        field: keyof Parametro,
        value: any,
    ) => {
        setParametrosEnEdicion((prev) =>
            prev.map((param, i) =>
                i === index ? { ...param, [field]: value } : param,
            ),
        )
        // Marcar como cambiado
        setParametrosCambiados((prev) => new Set(prev).add(index.toString()))
    }

    const handleManoObraChange = (field: keyof ManoObra, value: any) => {
        if (!manoObraEnEdicion) return
        setManoObraEnEdicion((prev) => ({
            ...prev!,
            [field]: value,
        }))
        setManoObraCambiada(true)
    }

    const handleCostoFijoChange = (
        index: number,
        field: keyof CostoFijo,
        value: any,
    ) => {
        setCostosFijosEnEdicion((prev) =>
            prev.map((costo, i) =>
                i === index ? { ...costo, [field]: value } : costo,
            ),
        )
        // Marcar como cambiado
        setCostosFijosCambiados((prev) => new Set(prev).add(index.toString()))
    }

    const handleMesChange = (mes: string) => {
        setMesSeleccionado(mes)
        if (manoObraEnEdicion) {
            // Guardar con padding de ceros para formato MM/AAAA
            const mesConPadding = mes.padStart(2, '0')
            const nuevaFecha = `${mesConPadding}/${anoSeleccionado}`
            setManoObraEnEdicion((prev) => ({
                ...prev!,
                Fecha: nuevaFecha,
            }))
            setManoObraCambiada(true)
        }
    }

    const handleAnoChange = (ano: string) => {
        setAnoSeleccionado(ano)
        if (manoObraEnEdicion) {
            // Guardar con padding de ceros para formato MM/AAAA
            const mesConPadding = mesSeleccionado.padStart(2, '0')
            const nuevaFecha = `${mesConPadding}/${ano}`
            setManoObraEnEdicion((prev) => ({
                ...prev!,
                Fecha: nuevaFecha,
            }))
            setManoObraCambiada(true)
        }
    }

    const handleMargenChange = (key: string, value: number) => {
        if (!margenesEnEdicion) return
        setMargenesEnEdicion((prev) => ({
            ...prev!,
            [key]: value,
        }))
        setMargenesCambiados(true)
    }

    const handleSubmit = async () => {
        try {
            // Guardar solo parámetros que cambiaron
            for (const indexStr of parametrosCambiados) {
                const index = parseInt(indexStr)
                const parametro = parametrosEnEdicion[index]
                if (parametro?._id) {
                    await editCosto('Parametros', parametro._id, parametro)
                }
            }

            // Guardar mano de obra solo si cambió
            if (manoObraCambiada && manoObraEnEdicion) {
                await editCostoObject('ManoObra', manoObraEnEdicion)
            }

            // Guardar solo costos fijos que cambiaron
            for (const indexStr of costosFijosCambiados) {
                const index = parseInt(indexStr)
                const costoFijo = costosFijosEnEdicion[index]
                if (costoFijo?._id) {
                    await editCosto('CostosFijos', costoFijo._id, costoFijo)
                }
            }

            // Guardar márgenes solo si cambiaron
            if (margenesCambiados && margenesEnEdicion) {
                await editCostoObject('Margenes', margenesEnEdicion)
            }

            // Resetear tracking de cambios
            setParametrosCambiados(new Set())
            setManoObraCambiada(false)
            setCostosFijosCambiados(new Set())
            setMargenesCambiados(false)

            Swal.fire({
                title: '¡Éxito!',
                text: 'Los datos fueron actualizados correctamente.',
                icon: 'success',
            })
            onSave?.()
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar los datos.',
                icon: 'error',
            })
        }
    }

    return (
        <div>
            {/* Parámetros */}
            {parametrosEnEdicion.length > 0 && (
                <div className="mt-2">
                    <div>
                        <h5>Parámetros</h5>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        {parametrosEnEdicion.map((parametro, index) => (
                            <FormItem
                                key={index}
                                label={parametro.Detalle}
                                className="col-span-3 my-1"
                            >
                                <Input
                                    type="number"
                                    value={parametro.ValorCalculo}
                                    onChange={(e) =>
                                        handleParametroChange(
                                            index,
                                            'ValorCalculo',
                                            Number(e.target.value),
                                        )
                                    }
                                    min={0}
                                />
                            </FormItem>
                        ))}
                    </div>
                </div>
            )}

            {/* Mano de Obra */}
            {manoObraEnEdicion && (
                <div className="mt-6">
                    <div>
                        <h5>Mano de Obra</h5>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <FormItem label="Costo" className="col-span-3 my-1">
                            <Input
                                type="number"
                                value={manoObraEnEdicion.Costo}
                                onChange={(e) =>
                                    handleManoObraChange(
                                        'Costo',
                                        Number(e.target.value),
                                    )
                                }
                                min={0}
                            />
                        </FormItem>
                        <FormItem label="Mes" className="col-span-2 my-1">
                            <Select
                                value={
                                    meses.find(
                                        (opt) => opt.value === mesSeleccionado,
                                    ) || null
                                }
                                options={meses}
                                placeholder="Mes"
                                onChange={(opt) =>
                                    handleMesChange(opt?.value || '')
                                }
                            />
                        </FormItem>
                        <FormItem label="Año" className="col-span-2 my-1">
                            <Select
                                value={
                                    anoOptions.find(
                                        (opt) => opt.value === anoSeleccionado,
                                    ) || null
                                }
                                options={anoOptions}
                                placeholder="Año"
                                onChange={(opt) =>
                                    handleAnoChange(opt?.value || '')
                                }
                            />
                        </FormItem>
                    </div>
                </div>
            )}

            {/* Costos Fijos */}
            {costosFijosEnEdicion.length > 0 && (
                <div className="mt-6">
                    <div>
                        <h5>Costos Fijos</h5>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        {costosFijosEnEdicion.map((costoFijo, index) => (
                            <React.Fragment key={index}>
                                <FormItem
                                    label={costoFijo.Detalle}
                                    className="col-span-3 my-1"
                                >
                                    <Input
                                        type="number"
                                        value={costoFijo.Costo}
                                        onChange={(e) =>
                                            handleCostoFijoChange(
                                                index,
                                                'Costo',
                                                Number(e.target.value),
                                            )
                                        }
                                        min={0}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Tipo de Cobro"
                                    className="col-span-2 my-1"
                                >
                                    <Select
                                        value={
                                            cobroOptions.find(
                                                (opt) =>
                                                    opt.value ===
                                                    costoFijo.Cobro,
                                            ) || null
                                        }
                                        options={cobroOptions}
                                        placeholder="Tipo de Cobro"
                                        onChange={(opt) =>
                                            handleCostoFijoChange(
                                                index,
                                                'Cobro',
                                                opt?.value || '',
                                            )
                                        }
                                    />
                                </FormItem>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            {/* Margenes */}
            {margenesEnEdicion && (
                <div className="mt-6">
                    <div>
                        <h5>Margenes</h5>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        {Object.entries(margenesEnEdicion)
                            .filter(([key]) => key !== '__v')
                            .map(([key, value]) => (
                                <FormItem
                                    key={key}
                                    label={key}
                                    className="col-span-2 my-1"
                                >
                                    <Input
                                        type="number"
                                        value={value}
                                        onChange={(e) =>
                                            handleMargenChange(
                                                key,
                                                Number(e.target.value),
                                            )
                                        }
                                        min={0}
                                        step={0.1}
                                    />
                                </FormItem>
                            ))}
                    </div>
                </div>
            )}

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

export default EditParamsForm
