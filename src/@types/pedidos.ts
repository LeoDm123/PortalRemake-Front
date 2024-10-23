export type Pedido = {
    Obra: string
    Fecha: string
    NroPedido: string
    OrdenCompra: string
    Estado: string
    Materiales: Material[]
    _id: string
}

export type Material = {
    Codigo: string
    CantPedida: number
    CantEntrega: number
    Descripcion: string
    Unidad: string
    Recepciones: Recepcion[]
}

export type Recepcion = {
    CantRecibida: number
    FechaRecep: string
    nroPedido: string
    NroRemito: string
    Unidad: string
    TipoMov: string
    RemitoLog: string
}
