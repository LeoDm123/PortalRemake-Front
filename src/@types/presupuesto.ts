export interface Vidrio {
    Codigo: string
    Detalle: string
    Ancho: number
    Alto: number
    Cantidad: number
}

export interface PañoFijo {
    Posicion: string
    Ancho: number
    Alto: number
    Vidrio: string
}

export interface Precios {
    Detalle: string
    Precio: number
}

export interface Puerta {
    Nombre: string
    Ancho: number
    Alto: number
    Cantidad: number
    Precios: Precios[]
    Marco: string
    Hoja: string
    Placa: string
    Terminacion: string
    Apliques: string
    Vidrio: Vidrio
    PañoFijo: PañoFijo[]
    Corrediza: boolean
    SinTerminacion: boolean
    SinColocacion: boolean
    PuertaPrincipal: boolean
    ComplejidadExtra: number
    _id?: string
}

export interface Presupuesto {
    _id: string
    Cliente: string
    Obra: string
    Codigo: string
    Descuento: number
    Precio: number
    CondFacturacion: number
    IVA: number
    PrecioFinal: number
    Status: string
    Puertas: Puerta[]
    __v: number
}
