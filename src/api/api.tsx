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
    const DELETE_EXPENSE_ENDPOINT: string = `/pay/deletePago/${clientId}/${presupuestoId}/${pagoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_EXPENSE_ENDPOINT}`,
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
    const DELETE_EXPENSE_ENDPOINT: string = `/pres/deletePres/${clientId}/${presupuestoId}`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_EXPENSE_ENDPOINT}`,
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

////////////EXPENSES////////////////////

export const createExpense = async (
    email: string,
    comentarios: string,
    categoria: string,
    subCategoria: string,
    monto: number,
    divisa: string,
    fechaPago: Date,
    cuotas: number,
    repetir: string,
    dividir: boolean,
    condDiv: string,
    montoDiv: number,
    cuenta: string,
): Promise<any> => {
    const EXPENSE_ENDPOINT: string = '/expense/createExpense'

    try {
        const response = await fetch(`${API_BASE_URL}${EXPENSE_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                comentarios,
                categoria,
                subCategoria,
                monto,
                divisa,
                fechaPago,
                cuotas,
                repetir,
                dividir,
                condDiv,
                montoDiv,
                cuenta,
            }),
        })

        if (!response.ok) {
            throw new Error(`Error al registrar ingreso: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar ingreso:', error)
        throw error
    }
}

export const fetchExpenses = async (email: string): Promise<any> => {
    const EXPENSES_ENDPOINT: string = `/expense/fetchExpenses?email=${encodeURIComponent(email)}`

    try {
        const response = await fetch(`${API_BASE_URL}${EXPENSES_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los egresos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los egresos:', error)
        throw error
    }
}

export const fetchExpenseByID = async (
    email: string,
    expenseId: string,
): Promise<any> => {
    const FETCH_EXPENSE_BY_ID_ENDPOINT: string = `/expense/fetchExpenseByID`

    try {
        const response = await fetch(
            `${API_BASE_URL}${FETCH_EXPENSE_BY_ID_ENDPOINT}?email=${email}&expenseId=${expenseId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al obtener el gasto: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener el gasto:', error)
        throw error
    }
}

export const editExpense = async (
    email: string,
    expenseId: string,
    categoria: string,
    subCategoria: string,
    comentarios: string,
    monto: number,
    divisa: string,
    fechaPago: Date,
    cuotas: number,
    repetir: string,
    dividir: boolean,
    condDiv: string,
    montoDiv: number,
    cuenta: string,
): Promise<any> => {
    const EDIT_EXPENSE_ENDPOINT: string = `/expense/editExpense`

    try {
        const response = await fetch(
            `${API_BASE_URL}${EDIT_EXPENSE_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    expenseId,
                    updatedExpense: {
                        comentarios,
                        categoria,
                        subCategoria,
                        monto,
                        divisa,
                        fechaPago,
                        cuotas,
                        repetir,
                        dividir,
                        condDiv,
                        montoDiv,
                        cuenta,
                    },
                }),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al actualizar el gasto: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al actualizar el gasto:', error)
        throw error
    }
}

export const deleteExpense = async (
    email: string,
    expenseId: string,
): Promise<boolean> => {
    const DELETE_EXPENSE_ENDPOINT: string = `/expense/deleteExpense`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_EXPENSE_ENDPOINT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, expenseId }),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al borrar el gasto: ${response.status}`)
        }

        console.log('Gasto borrado correctamente')
        return true
    } catch (error) {
        console.error('Error al borrar el gasto:', error)
        throw error
    }
}

export const fetchExpensesByAccountId = async (
    email: string,
    accountId: string,
): Promise<any> => {
    const FETCH_EXPENSE_BY_ACCOUNT_ID_ENDPOINT: string = `/expense/fetchExpensesByAccountId`

    try {
        const response = await fetch(
            `${API_BASE_URL}${FETCH_EXPENSE_BY_ACCOUNT_ID_ENDPOINT}?email=${email}&accountId=${accountId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al obtener el gasto: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener el gasto:', error)
        throw error
    }
}

////////////BUDGETS////////////////////

export const createBudget = async (
    email: string,
    comentarios: string,
    categoria: string,
    subCategoria: string,
    monto: number,
    porcentaje: number,
    divisa: string,
    fechaPago: Date,
    repetir: string,
): Promise<any> => {
    const BUDGET_ENDPOINT: string = '/budget/createBudget'

    try {
        const response = await fetch(`${API_BASE_URL}${BUDGET_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                comentarios,
                categoria,
                subCategoria,
                monto,
                porcentaje,
                divisa,
                fechaPago,
                repetir,
            }),
        })

        if (!response.ok) {
            throw new Error(`Error al registrar ingreso: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar ingreso:', error)
        throw error
    }
}

export const fetchBudgets = async (email: string): Promise<any> => {
    const PAYMENTS_ENDPOINT: string = `/budget/fetchBudgets?email=${encodeURIComponent(email)}`

    try {
        const response = await fetch(`${API_BASE_URL}${PAYMENTS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los egresos: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener los egresos:', error)
        throw error
    }
}

////////////CATEGORIES////////////////////

export const fetchCategorias = async (): Promise<any> => {
    const CATEGORY_ENDPOINT: string = `/categoria/fetchCategorias`

    try {
        const response = await fetch(`${API_BASE_URL}${CATEGORY_ENDPOINT}`, {
            method: 'GET',
            headers: {},
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener las categorías: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener las categorías:', error)
        throw error
    }
}

export const fetchSubCategorias = async (categoriaId: string): Promise<any> => {
    const CATEGORY_ENDPOINT: string = `/categoria/fetchSubCategorias`

    try {
        const response = await fetch(`${API_BASE_URL}${CATEGORY_ENDPOINT}`, {
            method: 'GET',
            headers: {
                categoriaId: categoriaId,
            },
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener las subcategorías: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener las subcategorías:', error)
        throw error
    }
}

////////////ACCOUNTS////////////////////

export const createAccount = async (
    nombre: string,
    tipo: string,
    divisa: string,
    saldoInicial: number,
): Promise<any> => {
    const ACCOUNT_ENDPOINT: string = '/account/createAccount'

    try {
        const response = await fetch(`${API_BASE_URL}${ACCOUNT_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                tipo,
                divisa,
                saldoInicial,
            }),
        })

        if (!response.ok) {
            throw new Error(`Error al registrar ingreso: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al registrar ingreso:', error)
        throw error
    }
}

export const fetchAccounts = async (email: string): Promise<any> => {
    const ACCOUNT_ENDPOINT: string = `/account/fetchAccounts?email=${encodeURIComponent(email)}`

    try {
        const response = await fetch(`${API_BASE_URL}${ACCOUNT_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener las cuentas: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener las cuentas:', error)
        throw error
    }
}

export const fetchAccountByID = async (
    email: string,
    accountId: string,
): Promise<any> => {
    const FETCH_ACCOUNT_BY_ID_ENDPOINT: string = `/account/fetchAccountByID`

    try {
        const response = await fetch(
            `${API_BASE_URL}${FETCH_ACCOUNT_BY_ID_ENDPOINT}?email=${email}&accountId=${accountId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Error al obtener la cuenta: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener la cuenta:', error)
        throw error
    }
}

export const editAccount = async (
    email: string,
    accountId: string,
    nombre: string,
    tipo: string,
    divisa: string,
    saldoInicial: number,
): Promise<any> => {
    const EDIT_ACCOUNT_ENDPOINT: string = `/account/editAccount`

    try {
        const response = await fetch(
            `${API_BASE_URL}${EDIT_ACCOUNT_ENDPOINT}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    accountId,
                    updatedExpense: {
                        nombre,
                        tipo,
                        divisa,
                        saldoInicial,
                    },
                }),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al actualizar el gasto: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al actualizar el gasto:', error)
        throw error
    }
}

export const deleteAccount = async (
    email: string,
    accountId: string,
): Promise<boolean> => {
    const DELETE_ACCOUNT_ENDPOINT: string = `/account/deleteAccount`

    try {
        const response = await fetch(
            `${API_BASE_URL}${DELETE_ACCOUNT_ENDPOINT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, accountId }),
            },
        )

        if (!response.ok) {
            throw new Error(`Error al borrar el gasto: ${response.status}`)
        }

        console.log('Gasto borrado correctamente')
        return true
    } catch (error) {
        console.error('Error al borrar el gasto:', error)
        throw error
    }
}

//////////////////// OTHER ///////////////////////////

export const fetchDolarBlue = async (): Promise<any> => {
    const DOLAR_BLUE_ENDPOINT: string = 'https://dolarapi.com/v1/dolares/blue'

    try {
        const response = await fetch(DOLAR_BLUE_ENDPOINT, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener la información del dólar blue: ${response.status}`,
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al obtener la información del dólar blue:', error)
        throw error
    }
}
