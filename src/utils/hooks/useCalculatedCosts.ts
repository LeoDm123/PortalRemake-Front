import { useMemo } from 'react'
import { useCostos } from './useCostos'
import formatCurrency from './formatCurrency'
import { MATERIALS, PRODUCTS, DVH } from '@/constants/materiales.constant'
import { CalculatedCost } from '@/@types/calculoCostos'
import { CostoFijo, ManoObra, Margenes, Parametro } from '@/@types/costos'
import { Puerta } from '@/@types/presupuesto'
import { vidrios as vidriosList } from '@/constants/presupuestos.constant'

// Funciones de cálculo de costos por material
export const calculateMaterialCosts = {
    //Fabricación Puertas
    placaParaiso: (variables: any, margenes: any) => {
        const { PlacaParaiso } = variables
        if (!PlacaParaiso) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Ancho = 0,
            Alto = 0,
            Consumo = { valor: 0, unidad: '' },
        } = PlacaParaiso

        const materialArea = Ancho * Alto
        const desperdicio = margenes.Desperdicio

        const costo = (Costo / materialArea) * Consumo.valor * (1 + desperdicio)

        return {
            value: costo,
            formula: `placaParaiso: ${formatCurrency(Costo)} / ${materialArea.toFixed(4)}m²  * ${Consumo.valor}`,
        }
    },
    placaCrudo: (variables: any, margenes: any, puerta?: Puerta) => {
        const { PlacaCrudo } = variables
        if (!PlacaCrudo) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Ancho = 0,
            Alto = 0,
            Consumo = { valor: 0, unidad: '' },
        } = PlacaCrudo

        if (!puerta) {
            const area = Ancho * Alto
            const costo = (Costo / area) * Consumo.valor
            return {
                value: costo,
                formula: `placaCrudo: ${formatCurrency(Costo)} / ${area.toFixed(4)}m² * ${Consumo.valor} * |${area.toFixed(4)} - 2.5|`,
            }
        }

        const doorArea = (puerta.Ancho / 1000) * (puerta.Alto / 1000)
        const materialArea = Ancho * Alto
        const desperdicio = margenes.Desperdicio

        const costo = (Costo / materialArea) * Consumo.valor * (1 + desperdicio)
        return {
            value: costo,
            formula: `placaCrudo: ${formatCurrency(Costo)} / ${materialArea.toFixed(4)}m² * ${doorArea.toFixed(4)}m² * ${Consumo.valor}`,
        }
    },
    paraiso: (variables: any, margenes: any) => {
        const { MaderaMacizaParaiso } = variables
        if (!MaderaMacizaParaiso) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = MaderaMacizaParaiso
        const desperdicio = margenes.Desperdicio
        const costo = Volumen > 0 ? Costo * Volumen * (1 + desperdicio) : 0

        return {
            value: costo,
            formula: `Álamo: ${formatCurrency(Costo)} / ${Volumen.toFixed(4)}m³`,
        }
    },
    relleno: (variables: any, margenes: any) => {
        const { MaderaMacizaRelleno } = variables
        if (!MaderaMacizaRelleno) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = MaderaMacizaRelleno
        const desperdicio = margenes.Desperdicio
        const costo =
            Volumen > 0
                ? Costo * Volumen * Consumo.valor * (1 + desperdicio)
                : 0

        return {
            value: costo,
            formula: `Álamo: ${formatCurrency(Costo)} / ${Volumen.toFixed(4)}m³`,
        }
    },
    cantoParaiso: (variables: any, margenes: any) => {
        const { CantoParaiso } = variables
        if (!CantoParaiso) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Ancho = 0,
            Alto = 0,
            Consumo = { valor: 0, unidad: '' },
        } = CantoParaiso
        const desperdicio = margenes.Desperdicio
        const Area = Alto * Ancho
        const costo =
            Area > 0 ? (Costo / Area) * Consumo.valor * (1 + desperdicio) : 0

        return {
            value: costo,
            formula: `Canto Paraiso: ${formatCurrency(Costo)} / ${Area}m`,
        }
    },

    cemento: (variables: any, margenes: any) => {
        const { Cemento } = variables
        if (!Cemento) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = Cemento
        const desperdicio = margenes.Desperdicio
        const costo =
            Volumen > 0
                ? (Costo / Volumen) * Consumo.valor * (1 + desperdicio)
                : 0
        return {
            value: costo,
            formula: `Cemento: ${formatCurrency(Costo)} / ${Volumen}L`,
        }
    },
    cola: (variables: any, margenes: any) => {
        const { Cola } = variables
        if (!Cola) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = Cola
        const desperdicio = margenes.Desperdicio
        const costo =
            Volumen > 0
                ? (Costo / Volumen) * Consumo.valor * (1 + desperdicio)
                : 0

        return {
            value: costo,
            formula: `Cola: ${formatCurrency(Costo)} / ${Volumen}L`,
        }
    },
    //Lustre
    thiner: (variables: any, margenes: any) => {
        const { Thiner } = variables
        if (!Thiner) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = Thiner
        const desperdicio = margenes.Desperdicio

        const costo =
            Volumen > 0
                ? (Costo / Volumen) * Consumo.valor * (1 + desperdicio)
                : 0
        return {
            value: costo,
            formula: `Thiner: ${formatCurrency(Costo)} / ${Volumen}L`,
        }
    },
    lustre: (variables: any, margenes: any) => {
        const { Lustre } = variables
        if (!Lustre) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = Lustre
        const desperdicio = margenes.Desperdicio

        const costo =
            Volumen > 0
                ? (Costo / Volumen) * Consumo.valor * (1 + desperdicio)
                : 0
        return {
            value: costo,
            formula: `Lustre Poliuretánico: ${formatCurrency(Costo)} / ${Volumen}L`,
        }
    },
    lijas: (variables: any, margenes: any) => {
        const { Lijas } = variables
        if (!Lijas) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Unidades = 0,
            Consumo = { valor: 0, unidad: '' },
        } = Lijas
        const desperdicio = margenes.Desperdicio

        const costo =
            Unidades > 0
                ? (Costo / Unidades) * Consumo.valor * (1 + desperdicio)
                : 0
        return {
            value: costo,
            formula: `Lijas: ${formatCurrency(Costo)} / ${Unidades}U`,
        }
    },
    estopa: (variables: any, margenes: any) => {
        const { Estopa } = variables
        if (!Estopa) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Unidades = 0,
            Consumo = { valor: 0, unidad: '' },
        } = Estopa
        const desperdicio = margenes.Desperdicio

        const costo =
            Unidades > 0
                ? (Costo / Unidades) * Consumo.valor * (1 + desperdicio)
                : 0
        return {
            value: costo,
            formula: `Estopa: ${formatCurrency(Costo)} / ${Unidades}U`,
        }
    },
    //Hidrolaqueado
    pinturaBlanca: (variables: any, margenes: any) => {
        const { PinturaBlanca } = variables
        if (!PinturaBlanca) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = PinturaBlanca
        const desperdicio = margenes.Desperdicio

        const costo =
            Volumen > 0
                ? (Costo / Volumen) * Consumo.valor * (1 + desperdicio)
                : 0

        return {
            value: costo,
            formula: `Durecrom Blanco: ${formatCurrency(Costo)} / ${Volumen}L`,
        }
    },
    baseGris: (variables: any, margenes: any) => {
        const { BaseGris } = variables
        if (!BaseGris) return { value: 0, formula: '' }

        const {
            Costo = 0,
            Volumen = 0,
            Consumo = { valor: 0, unidad: '' },
        } = BaseGris
        const desperdicio = margenes.Desperdicio

        const costo =
            Volumen > 0
                ? (Costo / Volumen) * Consumo.valor * (1 + desperdicio)
                : 0

        return {
            value: costo,
            formula: `Base Gris: ${formatCurrency(Costo)} / ${Volumen}L`,
        }
    },
    //Marco
    paraisoMarco: (variables: any, margenes: any) => {
        const { PlacaParaiso } = variables
        if (!PlacaParaiso) return { value: 0, formula: '' }

        const { Costo = 0, Ancho = 0, Alto = 0 } = PlacaParaiso
        const area = Alto * Ancho
        const desperdicio = margenes.Desperdicio

        const costo = area > 0 ? (Costo / area) * (1 + desperdicio) : 0

        return {
            value: costo,
            formula: `Suplemento Paraiso: ${formatCurrency(Costo)} / ${area}m2`,
        }
    },
    burlete: (variables: any, margenes: any) => {
        const { Burlete } = variables
        if (!Burlete) return { value: 0, formula: '' }
        const { Costo = 0, Alto = 0 } = Burlete

        const costo = Alto > 0 ? Costo / Alto : 0

        return {
            value: costo,
            formula: `Suplemento Paraiso: ${formatCurrency(Costo)} / ${Alto}ml`,
        }
    },
    tableroEuca: (variables: any, margenes: any) => {
        const { Alistonado } = variables
        if (!Alistonado) return { value: 0, formula: '' }
        const { Costo = 0, Ancho = 0, Alto = 0 } = Alistonado
        const area = Alto * Ancho
        const desperdicio = margenes.Desperdicio

        const costo = area > 0 ? (Costo / area) * (1 + desperdicio) : 0

        return {
            area: area,
            value: costo,
            formula: `Alistonado Eucalipto: ${formatCurrency(Costo)} / ${area}m2`,
        }
    },
    cantoMarco: (variables: any, margenes: any) => {
        const { CantoParaiso } = variables
        if (!CantoParaiso) return { value: 0, formula: '' }

        const { Costo = 0, Ancho = 0, Alto = 0 } = CantoParaiso
        const desperdicio = margenes.Desperdicio
        const area = Alto * Ancho
        const costo = area > 0 ? (Costo / area) * (1 + desperdicio) : 0

        return {
            value: costo,
            formula: `Canto Paraiso: ${formatCurrency(Costo)} / ${area}m`,
        }
    },
}

// Función independiente para calcular el costo del marco
export const costoMarco = (
    variables: any,
    margenes: any,
    seccion: number,
    adicional: number,
) => {
    // Obtener los costos base de cada componente
    const costoAlistonado = calculateMaterialCosts.tableroEuca(
        variables,
        margenes,
    )
    const costoParaiso = calculateMaterialCosts.paraisoMarco(
        variables,
        margenes,
    )
    const costoCanto = calculateMaterialCosts.cantoMarco(variables, margenes)
    const costoBurlete = calculateMaterialCosts.burlete(variables, margenes)

    const costoTotal =
        (costoAlistonado.value * seccion +
            costoParaiso.value * (seccion - 0.05) +
            costoCanto.value * (0.05 * 3) +
            costoBurlete.value) *
        (1 + adicional)

    return {
        value: costoTotal,
        formula: `Costo Marco (${seccion}m²) = ${formatCurrency(costoAlistonado.value)} * ${seccion} + ${formatCurrency(costoParaiso.value)} * (${seccion} - 0.05) + ${formatCurrency(costoCanto.value)} * (0.05 * 3) + ${formatCurrency(costoBurlete.value)}`,
        components: {
            alistonado: costoAlistonado,
            paraiso: costoParaiso,
            canto: costoCanto,
            burlete: costoBurlete,
        },
    }
}

export const costoInsumosColocacion = (variables: any) => {
    const { Tornillo, Silicona, Espuma } = variables
    if (!Tornillo) return { value: 0, formula: '' }
    if (!Silicona) return { value: 0, formula: '' }
    if (!Espuma) return { value: 0, formula: '' }

    const CostoTornillo = Tornillo.Costo
    const UnidadesTornillo = Tornillo.Unidades
    const ConsumoTornillo = Tornillo.Consumo

    const CostoSilicona = Silicona.Costo
    const VolumenSilicona = Silicona.Volumen
    const ConsumoSilicona = Silicona.Consumo

    const CostoEspuma = Espuma.Costo
    const VolumenEspuma = Espuma.Volumen
    const ConsumoEspuma = Espuma.Consumo

    const tornillos = (CostoTornillo / UnidadesTornillo) * ConsumoTornillo.valor
    const silicona = (CostoSilicona / VolumenSilicona) * ConsumoSilicona.valor
    const espuma = (CostoEspuma / VolumenEspuma) * ConsumoEspuma.valor

    const total = tornillos + silicona + espuma

    return {
        value: total,
        formula: ``,
        components: {
            Tornillos: tornillos,
            Silicona: silicona,
            Espuma: espuma,
        },
    }
}

export const costoAplique = (variables: any, margenes: any) => {
    const { Alistonado, Cola } = variables
    if (!Alistonado) return { value: 0, formula: '' }
    if (!Cola) return { value: 0, formula: '' }

    //Costo revestimiento alistonado euca
    const alistonado = Alistonado.Costo
    const cola = Cola.Costo
    const Volumen = Cola.Volumen
    const Consumo = Cola.Consumo

    const costoAlistonado = alistonado / 40 / 3 //40 son la cantidad de tiras de 3x3cm que salen de una placa y 3 son los ml de cada tira que salen de la placa
    const costoCola = ((cola / Volumen) * Consumo.valor) / 20

    const costoTotalEuca = (costoAlistonado + costoCola) * 34 //34 es el numero de listones separados 1 cm entre ellos que entran en 1 metro de ancho.

    return {
        value: costoTotalEuca,
        formula: `Costo Aplique = ${formatCurrency(costoAlistonado)} / 40 / 3 + ${formatCurrency(costoCola)} / 20`,
        components: {
            alistonado: costoAlistonado,
            cola: costoCola,
        },
    }
}

export const costoVidrio = (
    costoVidrios: any[],
    vidrioArea: number,
    vidrioML: number,
    vidrioCodigo: string,
    vidrioCantidad: number,
) => {
    if (!vidrioCodigo) return { value: 0, formula: 'Vidrio no seleccionado' }

    const vidrioCode = vidriosList.find((v) => v.value === vidrioCodigo)?.value
    const vidrioTipo = vidriosList.find((v) => v.value === vidrioCodigo)?.tipo
    const vidrioSeleccionado =
        costoVidrios.find((v) => v.Codigo === vidrioCode) || ''
    const costoVidrio = vidrioSeleccionado.Costo || 0

    if (vidrioTipo === 'dvh') {
        // Buscar el DVH correspondiente
        const dvh = DVH.find((d) => d.id === vidrioCodigo)

        if (!dvh) {
            return {
                value: 0,
                formula: ``,
            }
        }
        // Sumar el costo de los dos vidrios y la cámara
        let total = 0
        let formula = ''
        // Vidrios
        dvh.vidrios.forEach((v) => {
            const vidrioData = costoVidrios.find(
                (cv: any) => cv.Codigo === v.id,
            )
            const costoVidrio = vidrioData.Costo

            if (vidrioData) {
                total += costoVidrio * vidrioArea
                formula += ``
            } else {
                formula += ``
            }
        })
        // Cámara
        const camaraData = costoVidrios.find(
            (cv: any) => cv.Codigo === dvh.camara.id,
        )
        const costoCamara = camaraData.Costo

        if (camaraData) {
            total += costoCamara * vidrioML
            formula += ` `
        } else {
            formula += ''
        }
        return {
            value: total,
            formula,
        }
    } else {
        // SIMPLE
        if (!vidrioCodigo) {
            return {
                value: 0,
                formula: ``,
            }
        }

        const costoTotal = costoVidrio * vidrioArea * vidrioCantidad

        return {
            value: costoTotal,
            formula: '',
            components: {
                area: vidrioArea,
            },
        }
    }
}

// Función para calcular costos de mano de obra
export const calculateLaborCosts = (
    manoObra: ManoObra | undefined,
    costosFijos: CostoFijo[],
    parametros: Parametro[],
    margenes: Margenes | undefined,
) => {
    if (!manoObra?.Costo)
        return {
            costoTotal: 0,
            costoColocacionMarco: 0,
            costoColocacionHoja: 0,
            costoFabricacionHoja: 0,
            costoFabricacionBoca: 0,
            costoFabricacionMarco: 0,
            costoLustradoHoja: 0,
            costoLustradoMarco: 0,
            costoPintadoHoja: 0,
            costoPintadoMarco: 0,
        }

    const costoBase = manoObra.Costo

    // Obtener parámetros necesarios
    const jornada =
        parametros.find((p) => p.Detalle === 'Horas por jornada')
            ?.ValorCalculo || 9
    const puertasFabricadasSemanales =
        parametros.find((p) => p.Detalle === 'Puertas producidas semanalmente')
            ?.ValorCalculo || 12
    const puertasLustradasSemanales =
        parametros.find((p) => p.Detalle === 'Puertas lustradas semanalmente')
            ?.ValorCalculo || 12
    const puertasPintadasSemanales =
        parametros.find((p) => p.Detalle === 'Puertas pintadas semanalmente')
            ?.ValorCalculo || 8
    const puertasColocadasSemanales =
        parametros.find((p) => p.Detalle === 'Puertas colocadas semanalmente')
            ?.ValorCalculo || 30
    const operariosPuerta =
        parametros.find((p) => p.Detalle === 'Operarios por puerta')
            ?.ValorCalculo || 1
    const operariosFabricacion =
        parametros.find((p) => p.Detalle === 'Operarios en fabricación puerta')
            ?.ValorCalculo || 3
    const operariosLustre =
        parametros.find((p) => p.Detalle === 'Operarios en lustre puerta')
            ?.ValorCalculo || 3
    const operariosPintura =
        parametros.find((p) => p.Detalle === 'Operarios en pintura puerta')
            ?.ValorCalculo || 3
    const operariosColocacion =
        parametros.find((p) => p.Detalle === 'Operarios en colocación puerta')
            ?.ValorCalculo || 3
    const ponderadoHoja =
        parametros.find((p) => p.Detalle === 'Ponderado por Puerta')
            ?.ValorCalculo || 3
    const ponderadoMarco =
        parametros.find((p) => p.Detalle === 'Ponderado por Marco')
            ?.ValorCalculo || 3
    const operariosTotales =
        parametros.find((p) => p.Detalle === 'Operarios Totales')
            ?.ValorCalculo || 9
    const mlMarcoStandar =
        parametros.find((p) => p.Detalle === 'ML de marco Puerta 800 x 2100')
            ?.ValorCalculo || 8
    const areaStandar =
        parametros.find((p) => p.Detalle === 'Area por puerta 800 x 2100')
            ?.ValorCalculo || 1.68
    const horasSemanales = jornada * 5
    const horasMensuales = horasSemanales * 4

    // Calcular el ponderador de costos fijos
    let sumaCostosFijos = 0
    let formulaCostosFijos = ''

    costosFijos.forEach((costoFijo, index) => {
        if (costoFijo?.Costo) {
            sumaCostosFijos += costoFijo.Costo

            if (index > 0) formulaCostosFijos += ' + '
            formulaCostosFijos += `${formatCurrency(costoFijo.Costo)}`
        }
    })

    const ponderador = sumaCostosFijos / (horasMensuales * operariosTotales)
    const costoTotal = costoBase + ponderador

    //Colocacion en obra
    const horasColocacionSemanales = operariosColocacion * horasSemanales
    const costoColocacion =
        (costoTotal * horasColocacionSemanales) / puertasColocadasSemanales
    const costoColocacionMarco = costoColocacion * ponderadoMarco
    const costoColocacionHoja = costoColocacion * ponderadoHoja

    //Costo de fabricacion
    const horasFabricacionSemanales = operariosFabricacion * horasSemanales
    const costoFabricacion =
        (costoTotal * horasFabricacionSemanales) / puertasFabricadasSemanales
    const costoFabricacionMarco = costoFabricacion * ponderadoMarco
    const costoFabricacionHoja = costoFabricacion * ponderadoHoja

    const costoFabricacionBoca = costoTotal * jornada * 0.8

    //Costo de lustrado
    const horasLustradoSemanales = operariosLustre * horasSemanales
    const costoLustrado =
        (costoTotal * horasLustradoSemanales) / puertasLustradasSemanales
    const costoLustradoMarco = costoLustrado * ponderadoMarco
    const costoLustradoHoja = costoLustrado * ponderadoHoja

    //Costo de pintado
    const horasPintadoSemanales = operariosPintura * horasSemanales
    const costoPintado =
        (costoTotal * horasPintadoSemanales) / puertasPintadasSemanales
    const costoPintadoMarco = costoPintado * ponderadoMarco
    const costoPintadoHoja = costoPintado * ponderadoHoja

    return {
        costoTotal,
        costoColocacionMarco,
        costoColocacionHoja,
        costoFabricacionHoja,
        costoFabricacionBoca,
        costoFabricacionMarco,
        costoLustradoHoja,
        costoLustradoMarco,
        costoPintadoHoja,
        costoPintadoMarco,
    }
}

export const useCalculatedCosts = (puerta?: Puerta) => {
    const {
        variablesPredefinidas,
        margenes,
        parametros,
        costosFijos,
        manoObra,
        costoVidrios,
        loading,
        error,
    } = useCostos()

    const { calculatedCosts, groupedCosts } = useMemo(() => {
        const costs: CalculatedCost[] = []

        // Calcular costos para cada producto
        PRODUCTS.forEach((product) => {
            let mats: {
                id: string
                calc: (variables: any) => { value: number; formula: string }
            }[] = []
            if (product.id === 'puerta-lustrar') {
                mats = [
                    {
                        id: 'placaParaiso',
                        calc: (v) =>
                            calculateMaterialCosts.placaParaiso(v, margenes),
                    },
                    {
                        id: 'relleno',
                        calc: (v) =>
                            calculateMaterialCosts.relleno(v, margenes),
                    },
                    {
                        id: 'cantoParaiso',
                        calc: (v) =>
                            calculateMaterialCosts.cantoParaiso(v, margenes),
                    },
                    {
                        id: 'cemento',
                        calc: (v) =>
                            calculateMaterialCosts.cemento(v, margenes),
                    },
                    {
                        id: 'cola',
                        calc: (v) => calculateMaterialCosts.cola(v, margenes),
                    },
                ]
            } else if (product.id === 'puerta-pintar') {
                mats = [
                    {
                        id: 'placaCrudo',
                        calc: (v) =>
                            calculateMaterialCosts.placaCrudo(
                                v,
                                margenes,
                                puerta,
                            ),
                    },
                    {
                        id: 'cemento',
                        calc: (v) =>
                            calculateMaterialCosts.cemento(v, margenes),
                    },
                    {
                        id: 'cola',
                        calc: (v) => calculateMaterialCosts.cola(v, margenes),
                    },
                ]
            } else if (product.id === 'terminacion-lustre') {
                mats = [
                    {
                        id: 'thiner',
                        calc: (v) => calculateMaterialCosts.thiner(v, margenes),
                    },
                    {
                        id: 'lustre',
                        calc: (v) => calculateMaterialCosts.lustre(v, margenes),
                    },
                    {
                        id: 'lijas',
                        calc: (v) => calculateMaterialCosts.lijas(v, margenes),
                    },
                    {
                        id: 'estopa',
                        calc: (v) => calculateMaterialCosts.estopa(v, margenes),
                    },
                ]
            } else if (product.id === 'terminacion-hidrolaqueado') {
                mats = [
                    {
                        id: 'baseGris',
                        calc: (v) =>
                            calculateMaterialCosts.baseGris(v, margenes),
                    },
                    {
                        id: 'pinturaBlanca',
                        calc: (v) =>
                            calculateMaterialCosts.pinturaBlanca(v, margenes),
                    },
                    {
                        id: 'thiner',
                        calc: (v) => calculateMaterialCosts.thiner(v, margenes),
                    },
                    {
                        id: 'lijas',
                        calc: (v) => calculateMaterialCosts.lijas(v, margenes),
                    },
                ]
            } else if (product.id === 'marco') {
                mats = [
                    {
                        id: 'paraisoMarco',
                        calc: (v) =>
                            calculateMaterialCosts.paraisoMarco(v, margenes),
                    },
                    {
                        id: 'burlete',
                        calc: (v) =>
                            calculateMaterialCosts.burlete(v, margenes),
                    },
                    {
                        id: 'tableroEuca',
                        calc: (v) =>
                            calculateMaterialCosts.tableroEuca(v, margenes),
                    },
                    {
                        id: 'cantoMarco',
                        calc: (v) =>
                            calculateMaterialCosts.cantoMarco(v, margenes),
                    },
                ]
            }
            // Solo pushear si no existe ya ese material para ese producto
            mats.forEach(({ id, calc }, idx) => {
                const { value, formula } = calc(variablesPredefinidas)

                if (
                    value > 0 &&
                    !costs.some(
                        (c) =>
                            c.materialId === id &&
                            c.isVariable &&
                            c.label ===
                                (MATERIALS.find((m) => m.id === id)?.label ||
                                    id),
                    )
                ) {
                    costs.push({
                        label: MATERIALS.find((m) => m.id === id)?.label || id,
                        value,
                        formula,
                        materialId: id,
                        order: idx + 2,
                        isVariable: true,
                    })
                }
            })
            const laborCost = calculateLaborCosts(
                manoObra,
                costosFijos,
                parametros,
                margenes,
            )
        })

        // Group costs by product
        const grouped = PRODUCTS.map((product) => {
            // Solo los costos de los materiales relevantes para el producto
            const productMaterialIds = MATERIALS.filter((m) =>
                m.products.includes(product.id),
            ).map((m) => m.id)
            // Solo un costo por materialId y tipo (fijo/variable)
            const productCosts: CalculatedCost[] = []
            productMaterialIds.forEach((materialId) => {
                const fixed = costs.find(
                    (c) => c.materialId === materialId && c.isFixed,
                )
                if (fixed) productCosts.push(fixed)
                const variable = costs.find(
                    (c) => c.materialId === materialId && c.isVariable,
                )
                if (variable) productCosts.push(variable)
            })
            const total = productCosts.reduce(
                (sum, cost) => sum + cost.value,
                0,
            )

            return {
                product,
                costs: productCosts,
                total,
            }
        })

        return { calculatedCosts: costs, groupedCosts: grouped }
    }, [variablesPredefinidas, manoObra, costosFijos, parametros, puerta])

    return {
        calculateMaterialCosts,
        calculatedCosts,
        groupedCosts,
        products: PRODUCTS,
        materials: MATERIALS,
        loading,
        error,
        variablesPredefinidas,
        margenes,
    }
}
