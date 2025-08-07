import React, { useState } from 'react'
import AddPresPuertasButton from '@/components/template/PresupuestosView/Buttons/AddPresPuertasButton'
import PresPuertasList from '@/components/template/PresupuestosView/Lists/PresPuertasList'
import { usePresPuertas } from '@/utils/hooks/usePresPuertas'
import AddPresPuertasModal from '@/components/template/PresupuestosView/Modal/AddPresPuertaModal'
import '@/components/template/PresupuestosView/presupuestosViewStyles.css'
import SettingsButton from '@/components/template/PresupuestosView/Buttons/SettingsButton'
import CostosModal from '@/components/template/PresupuestosView/Modal/CostosModal'

const PresupuestadorView = () => {
    const { presPuertas, loading, fetchMateriales } = usePresPuertas()
    const [isPresPuertasModalOpen, setIsPresPuertasModalOpen] = useState(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen)
    }

    const togglePresPuertasModal = () => {
        setIsPresPuertasModalOpen(!isPresPuertasModalOpen)
    }

    const handleSubmitPres = () => {
        togglePresPuertasModal()
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
                />
            )}
            <AddPresPuertasModal
                isOpen={isPresPuertasModalOpen}
                toggleModal={togglePresPuertasModal}
                onSubmitPres={handleSubmitPres}
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
