// Archivo principal: AddPresPuertaForm.tsx

import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormContainer from '@/components/ui/Form/FormContainer'
import { Button } from '@/components/ui'
import Swal from 'sweetalert2'
import { Presupuesto, Puerta, Vidrio } from '@/@types/presupuesto'
import { createPresPuertas, editPresPuerta } from '@/api/api'
import { usePresPuertas } from '@/utils/hooks/usePresPuertas'
import PuertaDrawer from '../Drawers/PuertasDrawer'
import PresMainSpecs from './Components/PresMainSpecs'
import '../presupuestosViewStyles.css'
import PuertasList from './Components/PuertasList'
import AddPuertasButton from '../Buttons/AddPuertaButton'
import { useDoorCost } from '@/utils/hooks/useDoorCost'
import { vidrios } from '@/constants/presupuestos.constant'

const initialPuerta: Puerta = {
    Nombre: '',
    Ancho: 0,
    Alto: 0,
    Cantidad: 1,
    Precios: [],
    Marco: '',
    Hoja: '',
    Placa: '',
    Terminacion: '',
    Apliques: '',
    Vidrio: { Codigo: '', Detalle: '', Ancho: 0, Alto: 0, Cantidad: 0 },
    PañoFijo: [],
    Corrediza: false,
    SinTerminacion: false,
    SinColocacion: false,
    PuertaPrincipal: false,
    ComplejidadExtra: 0,
}

const initialValues: Presupuesto = {
    _id: '',
    Cliente: '',
    Obra: '',
    Codigo: '',
    Descuento: 0,
    Precio: 0,
    CondFacturacion: 0,
    IVA: 0,
    PrecioFinal: 0,
    Status: 'Pendiente',
    Puertas: [],
    __v: 0,
}

interface Props {
    onsubmit: () => void
    presupuestoToEdit?: Presupuesto | null
    isEditing?: boolean
}

const AddPresPuertaForm: React.FC<Props> = ({
    onsubmit,
    presupuestoToEdit = null,
    isEditing = false,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [nextCodigo, setNextCodigo] = useState<string | undefined>(undefined)
    const { getNextCodigo } = usePresPuertas()
    const [puertaEnEdicion, setPuertaEnEdicion] = useState<Puerta>({
        ...initialPuerta,
    })
    const [puertasGuardadas, setPuertasGuardadas] = useState<Puerta[]>([])
    const { doorCost } = useDoorCost(puertaEnEdicion)
    const [editIndex, setEditIndex] = useState<number | null>(null)

    // Inicializar con datos del presupuesto a editar si estamos en modo edición
    useEffect(() => {
        if (isEditing && presupuestoToEdit) {
            // Cargar las puertas del presupuesto a editar en localStorage
            localStorage.setItem(
                'puertas',
                JSON.stringify(presupuestoToEdit.Puertas),
            )
            setPuertasGuardadas(presupuestoToEdit.Puertas)
        } else {
            // Modo creación: limpiar localStorage
            localStorage.removeItem('puertas')
            setPuertasGuardadas([])
        }
    }, [isEditing, presupuestoToEdit])

    useEffect(() => {
        const stored = localStorage.getItem('puertas')
        if (stored) setPuertasGuardadas(JSON.parse(stored))
    }, [puertaEnEdicion])

    useEffect(() => {
        if (!isEditing) {
            const obtenerCodigo = async () => {
                const codigo = await getNextCodigo()
                setNextCodigo(codigo)
            }
            obtenerCodigo()
        }
    }, [isEditing, getNextCodigo])

    const handlePuertaChange = (field: keyof Puerta, value: any) => {
        setPuertaEnEdicion((prev) => ({ ...prev, [field]: value }))
    }

    const handleVidrioChange = (field: keyof Vidrio, value: any) => {
        setPuertaEnEdicion((prev) => {
            let newVidrio = { ...prev.Vidrio, [field]: value }
            if (field === 'Codigo') {
                const vidrioEncontrado = vidrios.find((v) => v.value === value)
                newVidrio.Detalle = vidrioEncontrado
                    ? vidrioEncontrado.label
                    : ''
            }
            return {
                ...prev,
                Vidrio: newVidrio,
            }
        })
    }

    const agregarPuerta = () => {
        const current = JSON.parse(localStorage.getItem('puertas') || '[]')

        // Transforma los costos en objetos Precios
        const costosComoPrecios = [
            { Detalle: 'Marco', Precio: doorCost?.marcoCost },
            { Detalle: 'Tapajuntas', Precio: doorCost?.tapajuntas },
            { Detalle: 'Hoja', Precio: doorCost?.hojaCost },
            { Detalle: 'Terminación', Precio: doorCost?.terminacionTotal },
            { Detalle: 'Fabricación', Precio: doorCost?.fabricacionTotal },
            { Detalle: 'Colocación Obra', Precio: doorCost?.colocacion },
            { Detalle: 'Aplique', Precio: doorCost?.apliqueCost },
            { Detalle: 'Vidrio', Precio: doorCost?.vidrioCost },
            { Detalle: 'Paño Fijo', Precio: doorCost?.pañoFijoCost },
            { Detalle: 'Total', Precio: doorCost?.totalCost },
        ]

        // Junta los precios existentes con los nuevos costos
        const puertaConPrecios = {
            ...puertaEnEdicion,
            Precios: [...(puertaEnEdicion.Precios || []), ...costosComoPrecios],
        }

        let updated
        if (editIndex !== null && editIndex >= 0) {
            // Editar puerta existente
            updated = [...current]
            updated[editIndex] = puertaConPrecios
        } else {
            // Agregar nueva puerta
            updated = [...current, puertaConPrecios]
        }
        localStorage.setItem('puertas', JSON.stringify(updated))
        setPuertaEnEdicion({ ...initialPuerta })
        setEditIndex(null)
    }

    const handleEditPuerta = (puerta: Puerta, index: number) => {
        setPuertaEnEdicion(puerta)
        setEditIndex(index)
        setDrawerOpen(true)
    }

    const handleDeletePuerta = (index: number) => {
        const current = JSON.parse(localStorage.getItem('puertas') || '[]')
        const updated = current.filter((_: any, idx: number) => idx !== index)
        localStorage.setItem('puertas', JSON.stringify(updated))
        setPuertasGuardadas(updated)
        // Si se está editando la misma puerta que se borra, resetear edición
        if (editIndex === index) {
            setPuertaEnEdicion({ ...initialPuerta })
            setEditIndex(null)
        }
    }

    const handleSubmit = async (
        values: Presupuesto,
        { resetForm }: { resetForm: () => void },
    ) => {
        try {
            const puertas = JSON.parse(localStorage.getItem('puertas') || '[]')
            // Calcular Precio como suma de los totales de las puertas
            const Precio = puertas.reduce((acc: number, puerta: Puerta) => {
                const total = puerta.Precios?.find(
                    (p: { Detalle: string; Precio: number }) =>
                        p.Detalle === 'Total',
                )
                return acc + (total ? total.Precio : 0)
            }, 0)
            // Calcular IVA y PrecioFinal
            const precioConDescuento =
                Precio - Precio * (values.Descuento / 100)
            const IVA =
                precioConDescuento * ((values.CondFacturacion / 100) * 0.21)
            const PrecioFinal = precioConDescuento + IVA
            const valuesConPuertas = {
                ...values,
                Puertas: puertas,
                Precio,
                IVA,
                PrecioFinal,
            }

            if (isEditing && presupuestoToEdit) {
                // Editar presupuesto existente
                await editPresPuerta(presupuestoToEdit._id, valuesConPuertas)
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'El presupuesto se editó correctamente.',
                    icon: 'success',
                })
            } else {
                // Crear nuevo presupuesto
                await createPresPuertas(valuesConPuertas)
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'El presupuesto se creó correctamente.',
                    icon: 'success',
                })
            }

            localStorage.removeItem('puertas')
            resetForm()
            onsubmit()
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: isEditing
                    ? 'Hubo un problema al editar el presupuesto.'
                    : 'Hubo un problema al crear el presupuesto.',
                icon: 'error',
            })
        }
    }

    const handleConfirmSubmit = (
        values: Presupuesto,
        submitForm: () => void,
    ) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: isEditing
                ? '¿Deseas editar este presupuesto?'
                : '¿Deseas crear este presupuesto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: isEditing ? 'Sí, editar' : 'Sí, crear',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) submitForm()
        })
    }

    return (
        <Formik
            initialValues={
                isEditing && presupuestoToEdit
                    ? { ...presupuestoToEdit, Codigo: presupuestoToEdit.Codigo }
                    : { ...initialValues, Codigo: nextCodigo || '' }
            }
            validationSchema={Yup.object({
                Cliente: Yup.string().required('Cliente es requerido'),
                Obra: Yup.string().required('Obra es requerida'),
                Codigo: Yup.string().required('Código es requerido'),
            })}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, submitForm }) => (
                <Form>
                    <FormContainer>
                        <div className="">
                            <PresMainSpecs />
                            <div>
                                <div className="title">
                                    <h5>Puertas presupuestadas</h5>
                                    <AddPuertasButton
                                        onClick={() => setDrawerOpen(true)}
                                    />
                                </div>
                                <PuertasList
                                    puertas={puertasGuardadas}
                                    onEdit={handleEditPuerta}
                                    onDelete={handleDeletePuerta}
                                />
                            </div>
                        </div>

                        <div>
                            <PuertaDrawer
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                puerta={puertaEnEdicion}
                                handlePuertaChange={handlePuertaChange}
                                handleVidrioChange={handleVidrioChange}
                                agregarPuerta={agregarPuerta}
                            />
                        </div>

                        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t z-50">
                            <Button
                                type="button"
                                variant="solid"
                                color="green"
                                onClick={() =>
                                    handleConfirmSubmit(values, submitForm)
                                }
                                className="w-full"
                            >
                                {isEditing
                                    ? 'Editar Presupuesto'
                                    : 'Crear Presupuesto'}
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default AddPresPuertaForm
