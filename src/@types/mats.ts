export type Material = {
    _id: string
    Codigo: string
    Descripcion: string
    Categoria: string
    Unidad: string
    Ancho: number
    Alto: number
    Largo: number
    Espesor: number
    Costo: number
    StockSeguridad: number
    Stock: number
    Proveedor: string
    InvLog: InventarioLog[]
}

export type InventarioLog = {
    _id: string
    Codigo: string
    Descripcion: string
    CantRecibida: number
    FechaRecep: string
    nroPedido: string
    TipoMov: string
    RemitoLog: string
    Unidad: string
    Cantidad: string
}

export type MatUpload = {
    Codigo: string
    Descripcion: string
    Categoria: string
    Unidad: string
    Ancho: number
    Alto: number
    Largo: number
    Espesor: number
    Costo: number
    StockSeguridad: number
    Stock: number
    Proveedor: string
}
