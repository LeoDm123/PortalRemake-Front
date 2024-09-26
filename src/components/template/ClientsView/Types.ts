type Presupuesto = {
    CondicionFacturacion: string
    IVA: number
    Precio: number
    PresupuestoCodigo: string
    Total: number
    Pagos: Pago[]
    Estado: 'Activo' | 'Deudor' | 'Otro'
}

type Pago = {
    PresupuestoCodigo: string
    FechaPago: string
    PagoCondicion: string
    PagoConcepto: string
    PagoComprobante: string
    PagoMonto: number
    Comentarios: string
}
