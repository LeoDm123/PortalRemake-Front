import AddClientButton from '@/components/template/ClientsView/Buttons/AddClientButton'
import OpenDBButton from '@/components/template/ClientsView/Buttons/OpenDBButton'
import ClientsCardList from '@/components/template/ClientsView/Lists/ClientsCardList'
import DividerMain from '@/components/template/DividerMain'
import { useState } from 'react'
import Sorter from '@/components/ui/Table/Sorter'
import AddClientModal from '@/components/template/ClientsView/Modal/AddClientModal'
import { fetchClients } from '@/api/api'

const ClientsView = () => {
    const [sortDirection, setSortDirection] = useState<
        'asc' | 'desc' | undefined
    >('asc')
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)

    const toggleSort = () => {
        if (sortDirection === 'asc') {
            setSortDirection('desc')
        } else {
            setSortDirection('asc')
        }
    }

    const toggleAddClientModal = () => {
        setIsAddClientModalOpen(!isAddClientModalOpen)
    }

    const handleSubmitClient = () => {
        toggleAddClientModal()
        fetchClients()
    }

    return (
        <>
            <div>
                <div className="mb-2 flex justify-between items-center">
                    <h4 style={{ color: '#01662b' }}>Clientes Activos</h4>

                    <div className="flex">
                        <button onClick={toggleSort} className="mr-4">
                            Ordenar A-Z
                            <Sorter sort={sortDirection} />
                        </button>
                        <AddClientButton isOpen={toggleAddClientModal} />
                        <OpenDBButton />
                    </div>
                </div>
                <DividerMain />
                <ClientsCardList
                    onClientSubmit={handleSubmitClient}
                    sortDirection={sortDirection}
                />
            </div>

            <AddClientModal
                isOpen={isAddClientModalOpen}
                toggleModal={toggleAddClientModal}
                onSubmitClient={handleSubmitClient}
            />
        </>
    )
}

export default ClientsView
