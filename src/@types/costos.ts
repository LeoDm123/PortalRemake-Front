export interface Material {
    _id: string
    Detalle: string
    Costo: number
    Unidad: string
    Ancho: number
    Alto: number
    Espesor: number
    Volumen: number
    Unidades: number
    Consumo: Consumo
    Categoria: string
}

export interface Consumo {
    valor: number
    unidad: string
}

export interface Parametro {
    _id?: string
    Detalle: string
    ValorCalculo: number
    LimiteSup: number
    LimiteInf: number
}

export interface ManoObra {
    _id?: string
    Costo: number
    Fecha: string
}

export interface CostoFijo {
    _id?: string
    Detalle: string
    Costo: number
    Cobro: string
}

export interface LaborCosts {
    costoTotal: number
    costoColocacionSimpleMenor: number
    costoColocacionSimpleMayor: number
    costoColocacionDobleMenor: number
    costoColocacionDobleMayor: number
    costoFabricacionBoca: number
    costoColocacionPasadores: number
    costoFabricacionMarco: number
    costoColocacionMarcoMenor: number
    costoColocacionMarcoMayor: number
    costoLustrado: number
    costoColocacionHerrajeMenor: number
    costoColocacionHerrajeMayor: number
    costoColocacionHerrajeDobleMenor: number
    costoColocacionHerrajeDobleMayor: number
}

export interface Costos {
    _id?: string
    Materiales: Material[]
    Parametros: Parametro[]
    ManoObra: ManoObra
    CostosFijos: CostoFijo[]
    Margenes: Margenes
    Vidrios: Vidrios[]
}

export interface Margenes {
    Marco: number
    Hoja: number
    Lustre: number
    Vidrio: number
    Colocacion: number
    Desperdicio: number
    PtaPpal: number
}

export interface Vidrios {
    _id?: string
    Codigo: string
    Detalle: string
    Costo: number
    Unidad: string
}
