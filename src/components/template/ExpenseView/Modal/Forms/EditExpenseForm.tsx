import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { editExpense, fetchCategorias } from '@/api/api'
import Swal from 'sweetalert2'
import { Switcher } from '@/components/ui'

interface EditModalProps {
    expense: Expense | null
    onSave: (expense: Expense) => void
    onClose: () => void
}

interface Expense {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    cuotas: number
    fechaPago: Date
    comentarios: string
    dividir: boolean
    condDiv: string
    montoDiv: number
}

export default function EditExpenseForm({
    expense,
    onSave,
    onClose,
}: EditModalProps) {
    const [email, setEmail] = useState<string>('')
    const [categoria, setCategoria] = useState<string>(expense?.categoria || '')
    const [subCategoria, setSubCategoria] = useState<string>(
        expense?.subCategoria || '',
    )
    const [comentarios, setComentarios] = useState<string>(
        expense?.comentarios || '',
    )
    const [monto, setMonto] = useState<number>(expense?.monto || 0)
    const [repetir, setRepetir] = useState<string>(expense?.repetir || '')
    const [divisa, setDivisa] = useState<string>(expense?.divisa || '')
    const [fechaPago, setFechaPago] = useState<string>(
        expense?.fechaPago
            ? new Date(expense.fechaPago).toISOString().split('T')[0]
            : '',
    )
    const [cuotas, setCuotas] = useState<number>(expense?.cuotas || 0)
    const [dividir, setDividir] = useState<boolean>(expense?.dividir || false)
    const [condDiv, setCondDiv] = useState<string>(expense?.condDiv || '')
    const [montoDiv, setMontoDiv] = useState<number>(expense?.montoDiv || 0)
    const [categorias, setCategorias] = useState<any[]>([])
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
    }, [])

    useEffect(() => {
        const fetchCategoriasData = async () => {
            try {
                const categoriasData = await fetchCategorias()
                const filteredCategorias = categoriasData.filter(
                    (cat: any) => cat.tipo === 'Egreso',
                )
                setCategorias(filteredCategorias)
            } catch (error) {
                console.error('Error fetching categorias:', error)
            }
        }

        fetchCategoriasData()
    }, [])

    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoria = e.target.value
        setCategoria(selectedCategoria)
        setSubCategoria('')
    }

    const handleSubCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSubCategoria(e.target.value)
    }

    const handleComentariosChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComentarios(e.target.value)
    }

    const handleMontoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMonto(parseFloat(e.target.value))
    }

    const handleDivisaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDivisa(e.target.value)
    }

    const handleFechaPagoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFechaPago(e.target.value)
    }

    const handleCuotasChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCuotas(parseFloat(e.target.value))
    }

    const handleRepetirChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRepetir(e.target.value)
    }

    const handleDividirChange = () => {
        setDividir(!dividir)
    }

    const handleCondDivChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCondDiv(e.target.value)
    }

    const handleMontoDivChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMontoDiv(parseFloat(e.target.value))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!email || !expense) {
            console.error(
                'No se encontró el correo electrónico o el gasto en el localStorage',
            )
            return
        }
        try {
            const parsedFechaPago = new Date(fechaPago)

            await editExpense(
                email,
                expense._id,
                categoria,
                subCategoria,
                comentarios,
                monto,
                divisa,
                parsedFechaPago,
                cuotas,
                repetir,
                dividir,
                condDiv,
                montoDiv,
            )

            const updatedExpense = {
                ...expense,
                categoria,
                subCategoria,
                comentarios,
                monto,
                divisa,
                fechaPago: parsedFechaPago,
                cuotas,
                repetir,
                dividir,
                condDiv,
                montoDiv,
            }

            Swal.fire({
                title: 'Gasto actualizado',
                text: 'El gasto se ha actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                onSave(updatedExpense)
                onClose()
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el gasto.',
                icon: 'error',
                confirmButtonText: 'OK',
            })
            console.error('Error al actualizar gasto:', error)
        }
    }

    const buttonStyle = {
        backgroundColor: isHovered ? '#5fa6be' : '#4289a5',
        transition: 'background-color 0.3s ease',
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Editar Gasto
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Modifique los detalles de su gasto
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="categoria"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Categoría
                            </label>
                            <div className="mt-2">
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={categoria}
                                    onChange={handleCategoriaChange}
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">
                                        Seleccione una categoría
                                    </option>
                                    {categorias.map((cat) => (
                                        <option
                                            key={cat._id}
                                            value={cat.nombre}
                                        >
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="subCategoria"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Sub-Categoría
                            </label>
                            <div className="mt-2">
                                <select
                                    id="subCategoria"
                                    name="subCategoria"
                                    value={subCategoria}
                                    onChange={handleSubCategoriaChange}
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">
                                        Seleccione una subcategoría
                                    </option>
                                    {categorias
                                        .filter(
                                            (cat) => cat.nombre === categoria,
                                        )
                                        .flatMap(
                                            (cat) => cat.subcategorias || [],
                                        )
                                        .map((subCat) => (
                                            <option
                                                key={subCat._id}
                                                value={subCat.nombre}
                                            >
                                                {subCat.nombre}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="monto"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Monto
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="monto"
                                    id="monto"
                                    min="0"
                                    value={monto}
                                    onChange={handleMontoChange}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="divisa"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Divisa
                            </label>
                            <div className="mt-2">
                                <select
                                    id="divisa"
                                    name="divisa"
                                    value={divisa}
                                    onChange={handleDivisaChange}
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">
                                        Seleccione una divisa
                                    </option>
                                    <option value="ARS">
                                        Peso Argentino (AR$)
                                    </option>
                                    <option value="USD">
                                        Dolar Estadounidense (U$D)
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="payments"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Fecha de Pago
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="payments"
                                    id="payments"
                                    min="0"
                                    value={fechaPago}
                                    onChange={handleFechaPagoChange}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="repetir"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Repetir
                            </label>
                            <div className="mt-2">
                                <select
                                    id="repetir"
                                    name="repetir"
                                    value={repetir}
                                    onChange={handleRepetirChange}
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">
                                        Seleccione una opción
                                    </option>
                                    <option value="Diariamente">
                                        Diariamente
                                    </option>
                                    <option value="Semanalmente">
                                        Semanalmente
                                    </option>
                                    <option value="Mensualmente">
                                        Mensualmente
                                    </option>
                                    <option value="Bimestralmente">
                                        Bimestralmente
                                    </option>
                                    <option value="Trimestralmente">
                                        Trimestralmente
                                    </option>
                                    <option value="Cuatrimestralmente">
                                        Cuatrimestralmente
                                    </option>
                                    <option value="Semestralmente">
                                        Semestralmente
                                    </option>
                                    <option value="Anualmente">
                                        Anualmente
                                    </option>
                                    <option value="No repetir">
                                        No repetir
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label
                                htmlFor="cuotas"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Cuotas
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="cuotas"
                                    id="cuotas"
                                    min="0"
                                    value={cuotas}
                                    onChange={handleCuotasChange}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="comentarios"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Comentarios
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="comentarios"
                                    id="comentarios"
                                    value={comentarios}
                                    onChange={handleComentariosChange}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label
                                htmlFor="dividir"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Dividir
                            </label>
                            <div className="mt-2">
                                <Switcher
                                    onChange={handleDividirChange}
                                    checked={dividir}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="condDiv"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Condición
                            </label>
                            <div className="mt-2">
                                <select
                                    id="condDiv"
                                    name="condDiv"
                                    value={condDiv}
                                    onChange={handleCondDivChange}
                                    disabled={!dividir}
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">
                                        Seleccione una opción
                                    </option>
                                    <option value="Equitativamente">
                                        Equitativamente
                                    </option>
                                    <option value="Partes iguales">
                                        Partes iguales
                                    </option>
                                    <option value="Monto fijo">
                                        Monto fijo
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="montoDiv"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Monto
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="montoDiv"
                                    id="montoDiv"
                                    min="0"
                                    value={montoDiv}
                                    onChange={handleMontoDivChange}
                                    disabled={
                                        !dividir || condDiv !== 'Monto fijo'
                                    }
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={onClose}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    style={buttonStyle}
                    className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}
