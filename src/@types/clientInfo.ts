export type Presupuesto = {
    CondicionFacturacion: string
    IVA: number
    Precio: number
    PresupuestoCodigo: string
    Total: number
    Pagos: Pago[]
    Estado: 'Activo' | 'Cerrado' | 'Otro'
    _id: string
}

export type Pago = {
    PresupuestoCodigo: string
    FechaPago: string
    PagoCondicion: string
    PagoConcepto: string
    PagoComprobante: string
    PagoMonto: number
    Comentarios: string
    _id: string
}

export type Client = {
    _id: string
    ClientName: string
    ClientApellido: string
    ClientDNI: string
    ClientCUIT: string
    ClientAdress: string
    ClientEmail: string
    ClientIVACond: string
    ClientTel: string
    ClientStatus: string
    Presupuestos: Presupuesto[]
}
