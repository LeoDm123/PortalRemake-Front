export type Pedido = {
    Cliente: string
    Obra: string
    Fecha: string
    NroPedido: string
    OrdenCompra: string
    Estado: string
    Materiales: Material[]
    Vidrios: Vidrio[]
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

export type Vidrio = {
    Codigo: string
    Tipologia: string
    Composicion: string
    Ancho: number
    Alto: number
    Cantidad: number
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
