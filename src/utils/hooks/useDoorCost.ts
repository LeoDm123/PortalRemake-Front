import { useMemo } from 'react'
import {
    useCalculatedCosts,
    calculateLaborCosts,
    costoMarco,
    costoAplique,
    costoVidrio,
    costoInsumosColocacion,
} from './useCalculatedCosts'
import { Puerta } from '@/@types/presupuesto'
import { marcos } from '@/constants/presupuestos.constant'
import { useCostos } from './useCostos'

export const useDoorCost = (puerta: Puerta) => {
    const {
        variablesPredefinidas,
        margenes,
        parametros,
        costosFijos,
        manoObra,
        costoVidrios,
        loading: costosLoading,
        error: costosError,
    } = useCostos()

    const {
        groupedCosts,
        loading: calculatedLoading,
        error: calculatedError,
    } = useCalculatedCosts(puerta)

    const loading = costosLoading || calculatedLoading
    const error = costosError || calculatedError

    const laborCosts = useMemo(() => {
        return calculateLaborCosts(manoObra, costosFijos, parametros, margenes)
    }, [manoObra, costosFijos, parametros, margenes])

    const doorCost = useMemo(() => {
        if (loading || error || !puerta) return null

        //Margenes
        const PtaPpal = margenes?.PtaPpal ? margenes.PtaPpal : 0
        const BenMarco = margenes?.Marco ? margenes.Marco : 0
        const BenHoja = margenes?.Hoja ? margenes.Hoja : 0
        const BenLustre = margenes?.Lustre ? margenes.Lustre : 0
        const BenVidrio = margenes?.Vidrio ? margenes.Vidrio : 0
        const BenColocacion = margenes?.Colocacion ? margenes.Colocacion : 0

        //Parametros
        const frameLenght = puerta.Ancho / 1000 + 2 * (puerta.Alto / 1000)
        const frameLenghtCorrediza =
            2 * (puerta.Ancho / 1000) + 3 * (puerta.Alto / 1000)
        const esMayor = puerta.Alto >= 2300
        const esDoble = puerta.Hoja === 'Doble'
        const lustrada = puerta.Terminacion === 'Lustrado'
        const laqueada = puerta.Terminacion === 'Laqueado'
        const molduras = puerta.Apliques === 'Molduras'
        const alistonado = puerta.Apliques === 'Revestimiento alistonado euca'
        const esCorrediza = puerta.Corrediza === true
        const extraComplex = puerta.ComplejidadExtra
            ? puerta.ComplejidadExtra / 100
            : 0
        const sinColocacion = puerta.SinColocacion
        const SinTerminacion = puerta.SinTerminacion
        const puertaPpal = puerta.PuertaPrincipal
        const suplemento = marcos.find((m) => m.value === '2x2')
        if (!suplemento) return null
        const suplementoCost = costoMarco(
            variablesPredefinidas,
            margenes,
            suplemento.anchoCm / 100,
            0,
        ).value
        const suplementoArea =
            (puerta.Ancho / 1000) * (suplemento.anchoCm / 100)
        const doorArea =
            (puerta.Ancho / 1000) * (puerta.Alto / 1000) - suplementoArea
        const doorTotalArea = doorArea + suplementoArea

        const vidrioSeleccionado = puerta.Vidrio
        const vidrioCodigo = vidrioSeleccionado.Codigo || ''
        const vidrioCantidad = vidrioSeleccionado.Cantidad || 0
        const vidrioArea =
            (vidrioSeleccionado.Ancho / 1000) *
                (vidrioSeleccionado.Alto / 1000) || 0
        const vidrioML =
            (vidrioSeleccionado.Ancho / 1000) * 2 +
                (vidrioSeleccionado.Alto / 1000) * 2 || 0

        const insumosColocacion =
            costoInsumosColocacion(variablesPredefinidas).value * frameLenght

        let finishCosts
        if (lustrada) {
            finishCosts = groupedCosts.find(
                (group) => group.product.id === 'terminacion-lustre',
            )
        } else if (laqueada) {
            finishCosts = groupedCosts.find(
                (group) => group.product.id === 'terminacion-hidrolaqueado',
            )
        }
        if (!finishCosts) return null

        let productCosts
        if (lustrada) {
            productCosts = groupedCosts.find(
                (group) => group.product.id === 'puerta-lustrar',
            )
        } else if (laqueada) {
            productCosts = groupedCosts.find(
                (group) => group.product.id === 'puerta-pintar',
            )
        }
        if (!productCosts) return null

        //Calculo de costo del marco
        const marcoSeleccionado = marcos.find((m) => m.value === puerta.Marco)
        const areaMarco = marcoSeleccionado?.areaDeLustreCm || 0

        const marcoCost = marcoSeleccionado
            ? costoMarco(
                  variablesPredefinidas,
                  margenes,
                  marcoSeleccionado.anchoCm / 100,
                  0,
              ).value *
              (esCorrediza ? frameLenghtCorrediza : frameLenght) *
              (extraComplex ? 1 + extraComplex : 1) *
              (puertaPpal ? 1 + PtaPpal : 1) *
              (1 + BenMarco)
            : 0

        //Calcular costo de Paño Fijo
        const pañoFijoCost = puerta.PañoFijo.reduce((total, paño) => {
            const PFLenght = 2 * (paño.Ancho / 1000) + 2 * (puerta.Alto / 1000)
            const PFArea = (paño.Ancho / 1000) * (puerta.Alto / 1000)
            const ciego = paño.Vidrio === 'Sin Vidrio'

            const vidrioCodigo = paño.Vidrio

            let costoVidrioPF = 0
            if (ciego) {
                costoVidrioPF = productCosts.costs.reduce(
                    (sum: any, cost: any) => {
                        const costValue = cost.isFixed
                            ? cost.value
                            : cost.value * PFArea * (1 + BenHoja)

                        return sum + costValue
                    },
                    0,
                )
            } else {
                costoVidrioPF =
                    costoVidrio(
                        costoVidrios,
                        PFArea,
                        PFLenght,
                        vidrioCodigo,
                        vidrioCantidad,
                    ).value *
                    (1 + BenVidrio)
            }

            const costoMarcoPF = marcoSeleccionado
                ? costoMarco(
                      variablesPredefinidas,
                      margenes,
                      marcoSeleccionado.anchoCm / 100,
                      0,
                  ).value *
                      PFLenght *
                      (extraComplex ? 1 + extraComplex : 1) *
                      (puertaPpal ? 1 + PtaPpal : 1) *
                      (1 + BenMarco) +
                  laborCosts.costoFabricacionMarco * PFLenght
                : 0

            let costoTerminaciónPF = 0
            if (ciego) {
                costoTerminaciónPF =
                    (finishCosts.costs.reduce((sum: any, cost: any) => {
                        return sum + cost.value * doorTotalArea
                    }, 0) +
                        laborCosts.costoLustradoHoja * PFArea +
                        finishCosts.costs.reduce((sum: any, cost: any) => {
                            return (
                                sum + cost.value * (areaMarco / 100) * PFLenght
                            )
                        }, 0) +
                        laborCosts.costoLustradoMarco *
                            (areaMarco / 100) *
                            PFLenght) *
                    (1 + BenLustre)
            } else {
                costoTerminaciónPF =
                    (finishCosts.costs.reduce((sum: any, cost: any) => {
                        return sum + cost.value * (areaMarco / 100) * PFLenght
                    }, 0) +
                        laborCosts.costoLustradoMarco *
                            (areaMarco / 100) *
                            PFLenght) *
                    (1 + BenLustre)
            }

            const costoTJ = costoMarcoPF * 0.2

            const colocacionPF = ciego
                ? laborCosts.costoColocacionMarco +
                  laborCosts.costoColocacionHoja
                : laborCosts.costoColocacionMarco

            const costo =
                (costoMarcoPF +
                    costoVidrioPF +
                    costoTerminaciónPF +
                    costoTJ +
                    colocacionPF) *
                (extraComplex ? 1 + extraComplex : 1) *
                (sinColocacion ? 0 : 1) *
                (1 + BenColocacion)

            return total + costo
        }, 0)

        //Calcular costo de las tapajuntas
        const tapajuntas = marcoCost * 0.2 * (puertaPpal ? 1 + PtaPpal : 1)

        //Calculo de costo de la hoja
        const hojaCost =
            (productCosts.costs.reduce((sum, cost) => {
                const costValue = cost.value * doorArea

                return sum + costValue
            }, 0) +
                suplementoCost *
                    (puerta.Ancho / 1000) *
                    (extraComplex ? 1 + extraComplex : 1) *
                    (puertaPpal ? 1 + PtaPpal : 1)) *
            (1 + BenHoja)

        //Calculo de costo de los apliques
        let apliqueCost = 0
        if (molduras) {
            apliqueCost = hojaCost * 0.2
        } else if (alistonado) {
            apliqueCost =
                costoAplique(variablesPredefinidas, margenes).value *
                doorArea *
                (extraComplex ? 1 + extraComplex : 1) *
                (1 + BenHoja)
        }

        if (!productCosts) return null

        //Calculo de costo de terminación
        const terminacionHojaCost = finishCosts.costs.reduce((sum, cost) => {
            return sum + cost.value * doorTotalArea * 2
        }, 0)

        const terminacionMarcoCost = finishCosts.costs.reduce((sum, cost) => {
            return sum + cost.value * (areaMarco / 100) * frameLenght
        }, 0)

        let MOLustre = 0
        if (lustrada) {
            MOLustre =
                laborCosts.costoLustradoHoja * (apliqueCost !== 0 ? 2 : 1) +
                +laborCosts.costoLustradoMarco
        } else if (laqueada) {
            MOLustre =
                laborCosts.costoPintadoHoja * (apliqueCost !== 0 ? 2 : 1) +
                +laborCosts.costoPintadoMarco
        }

        const terminacionTotal =
            (terminacionHojaCost + terminacionMarcoCost + MOLustre) *
            (1 + BenLustre)

        // Calcular costos de fabricación
        let fabricacionTotal = 0
        fabricacionTotal +=
            ((laborCosts.costoFabricacionHoja +
                laborCosts.costoFabricacionMarco) *
                (extraComplex ? 1 + extraComplex : 1) +
                (esDoble ? laborCosts.costoFabricacionBoca : 0) +
                (molduras || alistonado
                    ? laborCosts.costoFabricacionHoja * 0.2
                    : 0)) *
            (1 + BenColocacion)

        // Calcular costos de colocación en obra
        let colocacion =
            (laborCosts.costoColocacionHoja +
                laborCosts.costoColocacionMarco +
                insumosColocacion) *
            (extraComplex ? 1 + extraComplex : 1) *
            (sinColocacion ? 0 : 1) *
            (1 + BenColocacion)

        //Calcular costo de vidrio
        const vidrioCost = vidrioSeleccionado
            ? costoVidrio(
                  costoVidrios,
                  vidrioArea,
                  vidrioML,
                  vidrioCodigo,
                  vidrioCantidad,
              ).value *
              (1 + BenVidrio)
            : 0

        const totalCost =
            hojaCost +
            apliqueCost +
            marcoCost +
            tapajuntas +
            terminacionTotal +
            fabricacionTotal +
            colocacion +
            vidrioCost +
            pañoFijoCost

        return {
            hojaCost,
            apliqueCost,
            marcoCost,
            tapajuntas,
            terminacionHojaCost,
            terminacionMarcoCost,
            terminacionTotal,
            fabricacionTotal,
            colocacion,
            vidrioCost,
            pañoFijoCost,
            totalCost,
            doorArea,
        }
    }, [
        puerta,
        groupedCosts,
        loading,
        error,
        variablesPredefinidas,
        margenes,
        laborCosts,
    ])

    return {
        doorCost,
        loading,
        error,
    }
}
