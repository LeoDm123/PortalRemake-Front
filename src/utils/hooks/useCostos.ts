import { useState, useEffect } from 'react'
import { fetchCostos } from '../../api/api'
import {
    CostoFijo,
    ManoObra,
    Margenes,
    Material,
    Parametro,
    Vidrios,
} from '@/@types/costos'

export const useCostos = () => {
    const [materiales, setMateriales] = useState<Material[]>([])
    const [margenes, setMargenes] = useState<Margenes>()
    const [parametros, setParametros] = useState<Parametro[]>([])
    const [costosFijos, setCostosFijos] = useState<CostoFijo[]>([])
    const [manoObra, setManoObra] = useState<ManoObra>()
    const [costoVidrios, setCostoVidrios] = useState<Vidrios[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Cargar costos al montar el componente
    useEffect(() => {
        const cargarCostos = async () => {
            try {
                setLoading(true)
                const response = await fetchCostos()
                if (response && response.ok && response.costos) {
                    // Extraer los materiales del primer elemento del array de costos
                    const materiales = response.costos[0]?.Materiales || []
                    const margenes = response.costos[0]?.Margenes || undefined
                    const parametros = response.costos[0]?.Parametros || []
                    const costosFijos = response.costos[0]?.CostosFijos || []
                    const manoObra = response.costos[0]?.ManoObra || undefined
                    const costoVidrios = response.costos[0]?.Vidrios || []

                    setMateriales(materiales)
                    setMargenes(margenes)
                    setParametros(parametros)
                    setCostosFijos(costosFijos)
                    setManoObra(manoObra)
                    setCostoVidrios(costoVidrios)
                } else {
                    setMateriales([])
                    setMargenes(undefined)
                    setCostosFijos([])
                    setManoObra(undefined)
                    setCostoVidrios([])
                    setError('Formato de respuesta inválido')
                }
                setError(null)
            } catch (err) {
                setMateriales([])
                setMargenes(undefined)
                setManoObra(undefined)
                setCostosFijos([])
                setParametros([])
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Error al cargar los costos',
                )
            } finally {
                setLoading(false)
            }
        }

        cargarCostos()
    }, [])

    // Obtener un costo específico por su ID
    const obtenerCostoPorId = (id: string) => {
        return materiales.find((material) => material._id === id)
    }

    // Obtener un costo por su detalle
    const obtenerCostoPorDetalle = (detalle: string) => {
        const material = materiales.find((material) => {
            return material.Detalle === detalle
        })
        return material
    }

    // Obtener un parámetro por su detalle
    const obtenerParametroPorDetalle = (detalle: string) => {
        return parametros.find((parametro) => parametro.Detalle === detalle)
    }

    // Variables predefinidas para acceder directamente a los costos
    const variablesPredefinidas = {
        //Hoja
        PlacaParaiso: obtenerCostoPorDetalle('Placa Enchapada en Paraiso'),
        PlacaCrudo: obtenerCostoPorDetalle('Placa MDF Crudo'),
        MaderaMacizaParaiso: obtenerCostoPorDetalle('Madera Maciza de Paraiso'),
        MaderaMacizaRelleno: obtenerCostoPorDetalle('Madera Maciza de Relleno'),
        CantoParaiso: obtenerCostoPorDetalle('Canto de Paraiso'),
        Cola: obtenerCostoPorDetalle('Cola Vinilica'),
        Cemento: obtenerCostoPorDetalle('Cemento de Contacto'),
        //Marco
        Alistonado: obtenerCostoPorDetalle(
            'Alistonado de Eucalipto 3cm espesor',
        ),
        Burlete: obtenerCostoPorDetalle('Burlete de Goma'),
        //Lustre
        Thiner: obtenerCostoPorDetalle('Thiner'),
        Estopa: obtenerCostoPorDetalle('Bolsa de estopa'),
        Lustre: obtenerCostoPorDetalle('Lustre Poliuretánico 2c'),
        Lijas: obtenerCostoPorDetalle('Lijas'),
        //Hidrolaqueado
        BaseGris: obtenerCostoPorDetalle('Base Gris'),
        PinturaBlanca: obtenerCostoPorDetalle('Pintura Blanca 2c'),
        //Colocación
        Tornillo: obtenerCostoPorDetalle('Tornillo AMO 7,5'),
        Silicona: obtenerCostoPorDetalle('Silicona Neutra'),
        Espuma: obtenerCostoPorDetalle('Espuma de Poliuretáno'),
    }

    return {
        materiales,
        margenes,
        parametros,
        costosFijos,
        manoObra,
        costoVidrios,
        loading,
        error,
        obtenerCostoPorId,
        obtenerCostoPorDetalle,
        obtenerParametroPorDetalle,
        variablesPredefinidas,
    }
}
