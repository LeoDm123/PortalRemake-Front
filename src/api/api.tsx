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
