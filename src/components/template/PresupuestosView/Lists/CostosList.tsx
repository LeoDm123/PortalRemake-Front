import React, { useState, useEffect } from 'react'
import { Button, Spinner } from '@/components/ui'
import Swal from 'sweetalert2'
import { fetchCostos, deleteCosto } from '@/api/api'
import { Costos } from '@/@types/costos'
import MaterialesList from './Sublists/MaterialesList'
import ParametrosList from './Sublists/ParametrosList'
import ManoObraList from './Sublists/ManoObraList'
import CostosFijosList from './Sublists/CostosFijosList'
import '../presupuestosViewStyles.css'
import CostosMarcosList from './Sublists/CostosMarcosList'
import DividerMain from '../../DividerMain'
import EditButton from '../../EditButton'
import EditParamsModal from '../Modal/EditParamsModal'
import MargenesList from './Sublists/MargenesList'
import VidriosList from './Sublists/VidriosList'

interface Props {
    onEdit: (costo: Costos) => void
}

const CostosList: React.FC<Props> = ({ onEdit }) => {
    const [costos, setCostos] = useState<Costos[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleParamsModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleParamsSubmit = () => {
        toggleParamsModal()
        loadCostos()
    }

    const loadCostos = async () => {
        try {
            const response = await fetchCostos()
            if (response && response.ok && response.costos) {
                setCostos(response.costos)
            }
        } catch (error) {
            console.error('Error al cargar los costos:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al cargar los costos.',
                icon: 'error',
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadCostos()
    }, [])

    const handleSubmit = () => {
        loadCostos()
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size={48} />
            </div>
        )
    }

    return (
        <div className="h-full">
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
                {costos.map((costo) => (
                    <div key={costo._id}>
                        {/* Materiales */}
                        <MaterialesList
                            materiales={costo.Materiales || []}
                            onSubmit={handleSubmit}
                        />

                        {/* Marcos */}
                        {/* <CostosMarcosList onSubmit={handleSubmit} /> */}

                        {/* Vidrios */}
                        <VidriosList
                            vidrios={costo.Vidrios || []}
                            onSubmit={handleSubmit}
                        />

                        {/* Parámetros */}
                        <div>
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-medium mt-5 ">
                                    Parametros y Costos
                                </h4>
                                <EditButton
                                    size="medium"
                                    isOpen={() => {
                                        toggleParamsModal()
                                    }}
                                />
                            </div>
                            <DividerMain />
                        </div>
                        <div className="flex w-full">
                            <div className="mt-2 w-1/3">
                                <ParametrosList
                                    parametros={costo.Parametros || []}
                                />
                            </div>

                            <div className="w-1/3">
                                {/* Mano de Obra */}
                                <div className="mt-2 ml-3 ">
                                    <ManoObraList manoObra={costo.ManoObra} />
                                </div>

                                {/* Costos Fijos */}
                                <div className="mt-6 ml-3  ">
                                    <CostosFijosList
                                        costosFijos={costo.CostosFijos || []}
                                    />
                                </div>
                            </div>

                            <div className="w-1/3">
                                <div className="mt-2 ml-3 ">
                                    <MargenesList
                                        margenes={costo.Margenes || []}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <EditParamsModal
                isOpen={isModalOpen}
                toggleModal={toggleParamsModal}
                onSubmit={handleParamsSubmit}
            />
        </div>
    )
}

export default CostosList
