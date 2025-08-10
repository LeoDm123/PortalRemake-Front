import React, { useState } from 'react'
import AddPresPuertasButton from '@/components/template/PresupuestosView/Buttons/AddPresPuertasButton'
import PresPuertasList from '@/components/template/PresupuestosView/Lists/PresPuertasList'
import { usePresPuertas } from '@/utils/hooks/usePresPuertas'
import AddPresPuertasModal from '@/components/template/PresupuestosView/Modal/AddPresPuertaModal'
import EditPresPuertasModal from '@/components/template/PresupuestosView/Modal/EditPresPuertaModal'
import '@/components/template/PresupuestosView/presupuestosViewStyles.css'
import SettingsButton from '@/components/template/PresupuestosView/Buttons/SettingsButton'
import CostosModal from '@/components/template/PresupuestosView/Modal/CostosModal'
import { Presupuesto } from '@/@types/presupuesto'

const PresupuestadorView = () => {
    const { presPuertas, loading, fetchMateriales } = usePresPuertas()
    const [isPresPuertasModalOpen, setIsPresPuertasModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [presupuestoToEdit, setPresupuestoToEdit] =
        useState<Presupuesto | null>(null)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen)
    }

    const togglePresPuertasModal = () => {
        setIsPresPuertasModalOpen(!isPresPuertasModalOpen)
    }

    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen)
    }

    const handleEditPresupuesto = (presupuesto: Presupuesto) => {
        setPresupuestoToEdit(presupuesto)
        setIsEditModalOpen(true)
    }

    const handleSubmitPres = () => {
        togglePresPuertasModal()
        toggleEditModal()
        setPresupuestoToEdit(null)
        fetchMateriales()
    }

    const onDelete = () => {
        fetchMateriales()
    }

    return (
        <div>
            <div className="title">
                <div className="title">
                    <h4 style={{ color: '#01662b' }}>Crear presupuesto</h4>
                    <AddPresPuertasButton isOpen={togglePresPuertasModal} />
                </div>
                <div>
                    <SettingsButton isOpen={toggleSettingsModal} />
                </div>
            </div>
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <PresPuertasList
                    presupuestos={presPuertas}
                    onDelete={onDelete}
                    onEdit={handleEditPresupuesto}
                />
            )}
            <AddPresPuertasModal
                isOpen={isPresPuertasModalOpen}
                toggleModal={togglePresPuertasModal}
                onSubmitPres={handleSubmitPres}
            />

            <EditPresPuertasModal
                isOpen={isEditModalOpen}
                toggleModal={toggleEditModal}
                onSubmitPres={handleSubmitPres}
                presupuestoToEdit={presupuestoToEdit}
            />

            <CostosModal
                isOpen={isSettingsModalOpen}
                toggleModal={toggleSettingsModal}
                onSubmit={handleSubmitPres}
            />
        </div>
    )
}

export default PresupuestadorView
