const API_BASE_URL: string = process.env.API_BASE_URL as string

export const fetchUpdatePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
): Promise<boolean> => {
    const UPDATE_PASS_ENDPOINT: string = '/update-pass'

    try {
        const response = await fetch(
            `${API_BASE_URL}${UPDATE_PASS_ENDPOINT}/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contrasena_actual: oldPassword,
                    nueva_contrasena: newPassword,
                }),
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al actualizar la contraseña: ${response.status}`,
            )
        }

        console.log('Contraseña actualizada correctamente')
        return true
    } catch (error: any) {
        console.error('Error de red:', error.message)
        throw error
    }
}

export const fetchLoginUser = async (
    userEmail: string,
    userPassword: string,
): Promise<any> => {
    const LOGIN_ENDPOINT: string = '/auth/login'

    try {
        const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, userPassword }),
        })

        if (!response.ok) {
            throw new Error(`Error al iniciar sesion: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al iniciar sesion:', error)
        throw error
    }
}

////////////CLIENTS////////////////////

export const createClient = async (
    clientName: string,
    clientApellido: string,
    clientIVACond: string,
    clientDNI: string,
    clientCUIT: string,
    clientAdress: string,
    clientTel: string,
    clientEmail: string,
    clientStatus: string,
    presupuestos: string[] = [],
): Promise<any> => {
    const CLIENT_ENDPOINT: string = '/clients/crearCliente'

    try {
        const response = await fetch(`${API_BASE_URL}${CLIENT_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ClientName: clientName,
                ClientApellido: clientApellido,
                ClientIVACond: clientIVACond,
                ClientDNI: clientDNI,
                ClientCUIT: clientCUIT,
                ClientAdress: clientAdress,
                ClientTel: clientTel,
                ClientEmail: clientEmail,
                ClientStatus: clientStatus,
                Presupuestos: presupuestos,
            }),
        })

        if (!response.ok) {
            throw new Error(`Error al registrar cliente: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar cliente:', error)
        throw error
    }
}

export const fetchClients = async (): Promise<any> => {
    const INCOME_ENDPOINT: string = `/clients/obtenerClientes`

    try {
        const response = await fetch(`${API_BASE_URL}${INCOME_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los ingresos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los ingresos:', error)
        throw error
    }
}

export const fetchActiveClients = async (): Promise<any> => {
    const INCOME_ENDPOINT: string = `/clients/obtenerClientesActivos`

    try {
        const response = await fetch(`${API_BASE_URL}${INCOME_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los ingresos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los ingresos:', error)
        throw error
    }
}

export const fetchClientById = async (clienteId: string): Promise<any> => {
    const CLIENT_ENDPOINT: string = `/clients/obtenerClientePorId/${clienteId}`

    try {
        const response = await fetch(`${API_BASE_URL}${CLIENT_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Cliente no encontrado')
            }
            throw new Error(`Error al obtener el cliente: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener el cliente:', error)
        throw error
    }
}

export const deleteClient = async (clientId: string): Promise<boolean> => {
    const DELETE_CLIENT_ENDPOINT: string = `/clients/deleteCliente/${clientId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_CLIENT_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al borrar el cliente: ${response.status}`)
        }

        console.log('Cliente borrado correctamente')
        return true
    } catch (error) {
        console.error('Error al borrar el cliente:', error)
        throw error
    }
}

export const editClient = async (
    clientId: string,
    updatedClientData: any,
): Promise<any> => {
    const CLIENT_ENDPOINT: string = `/clients/editCliente/${clientId}`

    try {
        const response = await fetch(`${API_BASE_URL}${CLIENT_ENDPOINT}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedClientData),
        })

        if (!response.ok) {
            throw new Error(`Error al editar el cliente: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al editar el cliente:', error)
        throw error
    }
}

////////////PAYMENTS////////////////////

export const createPayment = async (
    clientCUIT: string,
    presupuestoCodigo: string,
    fechaPago: string,
    pagoCondicion: string,
    pagoConcepto: string,
    pagoComprobante: string,
    pagoMonto: number,
    comentarios: string,
): Promise<any> => {
    const PAYMENT_ENDPOINT: string = '/pay/crearPago'

    try {
        const response = await fetch(`${API_BASE_URL}${PAYMENT_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ClientCUIT: clientCUIT,
                PresupuestoCodigo: presupuestoCodigo,
                FechaPago: fechaPago,
                PagoCondicion: pagoCondicion,
                PagoConcepto: pagoConcepto,
                PagoComprobante: pagoComprobante,
                PagoMonto: pagoMonto,
                Comentarios: comentarios,
            }),
        })

        if (!response.ok) {
            throw new Error(`Error al registrar pago: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar pago:', error)
        throw error
    }
}

export const deletePayment = async (
    clientId: string,
    presupuestoId: string,
    pagoId: string,
): Promise<boolean> => {
    const DELETE_PAYMENT_ENDPOINT: string = `/pay/deletePago/${clientId}/${presupuestoId}/${pagoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_PAYMENT_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al borrar el pago: ${response.status}`)
        }

        console.log('Pago borrado correctamente')
        return true
    } catch (error) {
        console.error('Error al borrar el pago:', error)
        throw error
    }
}

////////////PRESUPUESTOS////////////////////

export const createPresupuesto = async (
    presupuestoCodigo: string,
    condicionFacturacion: string,
    iva: number,
    precio: number,
    total: number,
    clientCUIT: string,
    estado: string,
): Promise<any> => {
    const PRESUPUESTO_ENDPOINT: string = '/pres/crearPresupuesto'

    try {
        const response = await fetch(`${API_BASE_URL}${PRESUPUESTO_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PresupuestoCodigo: presupuestoCodigo,
                CondicionFacturacion: condicionFacturacion,
                IVA: iva,
                Precio: precio,
                Total: total,
                ClientCUIT: clientCUIT,
                Estado: estado,
            }),
        })

        if (!response.ok) {
            throw new Error(
                `Error al registrar presupuesto: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar presupuesto:', error)
        throw error
    }
}

export const deletePres = async (
    clientId: string,
    presupuestoId: string,
): Promise<boolean> => {
    const DELETE_PRESUPUESTO_ENDPOINT: string = `/pres/deletePres/${clientId}/${presupuestoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_PRESUPUESTO_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al borrar el presupuesto: ${response.status}`,
            )
        }

        console.log('Presupuesto borrado correctamente')
        return true
    } catch (error) {
        console.error('Error al borrar el presupuesto:', error)
        throw error
    }
}

//////////////////////////////PEDIDOS PERFILES//////////////////////////////

export const createPedidoPerfiles = async (
    obra: string,
    fecha: string,
    nroPedido: string,
    ordenCompra: string,
    estado: string,
    materiales: any[],
): Promise<any> => {
    const PEDIDO_ENDPOINT: string = '/pedidoPerfiles/crearPedido'

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDO_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Obra: obra,
                Fecha: fecha,
                NroPedido: nroPedido,
                OrdenCompra: ordenCompra,
                Estado: estado,
                Materiales: materiales,
            }),
        })

        if (!response.ok) {
            throw new Error(`Error al registrar pedido: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar pedido:', error)
        throw error
    }
}

export const fetchPedidosPerfiles = async (): Promise<any> => {
    const PEDIDOS_ENDPOINT: string = `/pedidoPerfiles/obtenerPedidos`

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDOS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los pedidos:', error)
        throw error
    }
}

export const fetchPedidosPerfilesActivos = async (): Promise<any> => {
    const PEDIDOS_ENDPOINT: string = `/pedidoPerfiles/obtenerPedidosActivos`

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDOS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los pedidos:', error)
        throw error
    }
}

export const deletePedidoPerfiles = async (id: string): Promise<any> => {
    const DELETE_PEDIDO_ENDPOINT: string = `/pedidoPerfiles/deletePedido/${id}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_PEDIDO_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al eliminar el pedido: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al eliminar el pedido:', error)
        throw error
    }
}

export const RecibirPedidoPerfiles = async (
    pedidoId: string,
    codigoMat: string,
    payload: {
        CantRecibida: number
        FechaRecep: string
        nroPedido: string
        NroRemito: string
        Unidad: string
        TipoMov: string
        RemitoLog: string
    },
): Promise<any> => {
    const RECIBIR_PEDIDO_ENDPOINT = `/pedidoPerfiles/recibirPedido/${pedidoId}/${codigoMat}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${RECIBIR_PEDIDO_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData.message ||
                    `Error ${response.status}: ${response.statusText}`,
            )
        }

        const data = await response.json()

        return data
    } catch (error: unknown) {
        console.error('Error al recibir el pedido:', error)

        let errorMessage = 'Error desconocido'
        if (error instanceof Error) {
            errorMessage = error.message
        }

        throw new Error(errorMessage)
    }
}

export const updateEstadoPerfiles = async (
    pedidoId: string,
    estado: string,
): Promise<any> => {
    const UPDATE_ESTADO_ENDPOINT: string = `/pedidoPerfiles/editEstado/${pedidoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${UPDATE_ESTADO_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al actualizar el estado del pedido: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error)
        throw error
    }
}

//////////////////////////////PEDIDOS HERRAJES//////////////////////////////

export const createPedidoHerrajes = async (
    obra: string,
    fecha: string,
    nroPedido: string,
    ordenCompra: string,
    estado: string,
    materiales: any[],
): Promise<any> => {
    const PEDIDO_ENDPOINT: string = '/pedidoHerrajes/crearPedido'

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDO_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Obra: obra,
                Fecha: fecha,
                NroPedido: nroPedido,
                OrdenCompra: ordenCompra,
                Estado: estado,
                Materiales: materiales,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.msg || `Error al registrar pedido: ${response.status}`,
            )
        }

        if (data.msg === 'Pedido ya se encuentra registrado') {
            console.warn(data.msg)
        }

        return data
    } catch (error) {
        console.error('Error al registrar pedido:', error)
        throw error
    }
}

export const fetchPedidosHerrajes = async (): Promise<any> => {
    const PEDIDOS_ENDPOINT: string = `/pedidoHerrajes/obtenerPedidos`

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDOS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los pedidos:', error)
        throw error
    }
}

export const fetchPedidosHerrajesActivos = async (): Promise<any> => {
    const PEDIDOS_ENDPOINT: string = `/pedidoHerrajes/obtenerPedidosActivos`

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDOS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los pedidos:', error)
        throw error
    }
}

export const deletePedidoHerrajes = async (id: string): Promise<any> => {
    const DELETE_PEDIDO_ENDPOINT: string = `/pedidoHerrajes/deletePedido/${id}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_PEDIDO_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al eliminar el pedido: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al eliminar el pedido:', error)
        throw error
    }
}

export const RecibirPedidoHerrajes = async (
    pedidoId: string,
    codigoMat: string,
    payload: {
        CantRecibida: number
        FechaRecep: string
        nroPedido: string
        NroRemito: string
        Unidad: string
        TipoMov: string
        RemitoLog: string
    },
): Promise<any> => {
    const RECIBIR_PEDIDO_ENDPOINT = `/pedidoHerrajes/recibirPedido/${pedidoId}/${codigoMat}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${RECIBIR_PEDIDO_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData.message ||
                    `Error ${response.status}: ${response.statusText}`,
            )
        }

        const data = await response.json()

        return data
    } catch (error: unknown) {
        console.error('Error al recibir el pedido:', error)

        let errorMessage = 'Error desconocido'
        if (error instanceof Error) {
            errorMessage = error.message
        }

        throw new Error(errorMessage)
    }
}

export const updateEstadoHerrajes = async (
    pedidoId: string,
    estado: string,
): Promise<any> => {
    const UPDATE_ESTADO_ENDPOINT: string = `/pedidoHerrajes/editEstado/${pedidoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${UPDATE_ESTADO_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al actualizar el estado del pedido: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error)
        throw error
    }
}

//////////////////////////////PEDIDOS VIDRIOS//////////////////////////////

export const createPedidoVidrios = async (
    cliente: string,
    obra: string,
    fecha: string,
    nroPedido: string,
    estado: string,
    vidrios: any[],
): Promise<any> => {
    const PEDIDO_ENDPOINT: string = '/pedidoVidrios/crearPedido'

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDO_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Cliente: cliente,
                Obra: obra,
                Fecha: fecha,
                NroPedido: nroPedido,
                Estado: estado,
                Vidrios: vidrios,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.msg || `Error al registrar pedido: ${response.status}`,
            )
        }

        if (data.msg === 'Pedido ya se encuentra registrado') {
            console.warn(data.msg)
        }

        return data
    } catch (error) {
        console.error('Error al registrar pedido:', error)
        throw error
    }
}

export const fetchPedidosVidrios = async (): Promise<any> => {
    const PEDIDOS_ENDPOINT: string = `/pedidoVidrios/obtenerPedidos`

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDOS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los pedidos:', error)
        throw error
    }
}

export const fetchPedidosVidriosActivos = async (): Promise<any> => {
    const PEDIDOS_ENDPOINT: string = `/pedidoVidrios/obtenerPedidosActivos`

    try {
        const response = await fetch(`${API_BASE_URL}${PEDIDOS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los pedidos:', error)
        throw error
    }
}

export const deletePedidoVidrios = async (id: string): Promise<any> => {
    const DELETE_PEDIDO_ENDPOINT: string = `/pedidoVidrios/deletePedido/${id}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_PEDIDO_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al eliminar el pedido: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al eliminar el pedido:', error)
        throw error
    }
}

export const RecibirPedidoVidrios = async (
    pedidoId: string,
    codigoMat: string,
    payload: {
        CantRecibida: number
        FechaRecep: string
        nroPedido: string
        NroRemito: string
        RemitoLog: string
    },
): Promise<any> => {
    const RECIBIR_PEDIDO_ENDPOINT = `/pedidoVidrios/recibirPedido/${pedidoId}/${encodeURIComponent(codigoMat)}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${RECIBIR_PEDIDO_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData.message ||
                    `Error ${response.status}: ${response.statusText}`,
            )
        }

        const data = await response.json()

        return data
    } catch (error: unknown) {
        console.error('Error al recibir el pedido:', error)

        let errorMessage = 'Error desconocido'
        if (error instanceof Error) {
            errorMessage = error.message
        }

        throw new Error(errorMessage)
    }
}

export const updateEstadoVidrios = async (
    pedidoId: string,
    estado: string,
): Promise<any> => {
    const UPDATE_ESTADO_ENDPOINT: string = `/pedidoVidrios/editEstado/${pedidoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${UPDATE_ESTADO_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al actualizar el estado del pedido: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error)
        throw error
    }
}

//////////////////////////////INVENTARIO//////////////////////////////

export const fetchMateriales = async (): Promise<any> => {
    const MATERIALES_ENDPOINT: string = `/mats/obtenerMats`

    try {
        const response = await fetch(`${API_BASE_URL}${MATERIALES_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener los materiales: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los materiales:', error)
        throw error
    }
}

export const deleteMaterial = async (MatID: string): Promise<any> => {
    const BORRAR_MATERIAL_ENDPOINT: string = `/mats/deleteMat/${MatID}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${BORRAR_MATERIAL_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al eliminar el material: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al eliminar el material:', error)
        throw error
    }
}

export const editMaterial = async (
    MatId: string,
    updatedMatData: any,
): Promise<any> => {
    const MATERIALES_EDIT_ENDPOINT: string = `/mats/editMat/${MatId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${MATERIALES_EDIT_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMatData),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al editar el material: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al editar el material:', error)
        throw error
    }
}

export const createMaterial = async (newMatData: any): Promise<any> => {
    const MATERIALES_CREATE_ENDPOINT: string = `/mats/crearMaterial`

    try {
        const response = await fetch(
            `${API_BASE_URL}${MATERIALES_CREATE_ENDPOINT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMatData),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al crear el material: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al crear el material:', error)
        throw error
    }
}

export const updateStockMaterial = async (
    materialId: string,
    movimientoData: {
        Cantidad: number
        Fecha: string
        nroPedido: string
        Unidad: string
        TipoMov: string
        RemitoLog: string
    },
): Promise<any> => {
    const UPDATE_STOCK_ENDPOINT = `/mats/retirarIngresarMat/${materialId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${UPDATE_STOCK_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movimientoData),
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData?.message ||
                    `Error al actualizar el stock del material: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al actualizar el stock del material:', error)
        throw error
    }
}

//////////////////////////////LOGS////////////////////////////////
export const fetchInventarioLogs = async (): Promise<any> => {
    const LOGS_ENDPOINT: string = `/inv/obtenerLogs`

    try {
        const response = await fetch(`${API_BASE_URL}${LOGS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener los logs de inventario: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los logs de inventario:', error)
        throw error
    }
}

export const fetchLastLogs = async (): Promise<any> => {
    const LOGS_ENDPOINT: string = `/inv/obtenerUltimosMovimientos`

    try {
        const response = await fetch(`${API_BASE_URL}${LOGS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener los logs de inventario: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los logs de inventario:', error)
        throw error
    }
}

export const createInventarioLog = async (logData: any): Promise<any> => {
    const INVENTARIO_LOG_ENDPOINT = `/inv/crearLog`

    try {
        const response = await fetch(
            `${API_BASE_URL}${INVENTARIO_LOG_ENDPOINT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logData),
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al registrar el movimiento: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar el movimiento:', error)
        throw error
    }
}

export const deleteInventarioLog = async (logId: string): Promise<any> => {
    const DELETE_INVENTARIO_LOG_ENDPOINT = `/inv/deleteLog/${logId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_INVENTARIO_LOG_ENDPOINT}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ LogID: logId }),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al borrar el movimiento: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al borrar el movimiento:', error)
        throw error
    }
}
