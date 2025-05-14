import AddClientButton from '@/components/template/ClientsView/Buttons/AddClientButton'
import OpenDBButton from '@/components/template/ClientsView/Buttons/OpenDBButton'
import ClientsCardList from '@/components/template/ClientsView/Lists/ClientsCardList'
import DividerMain from '@/components/template/DividerMain'
import { useState } from 'react'
import Sorter from '@/components/ui/Table/Sorter'
import AddClientModal from '@/components/template/ClientsView/Modal/AddClientModal'
import { fetchClients } from '@/api/api'
import ShowClientSwitcher from '@/components/template/ClientsView/Buttons/ShowClientSwitcher'

const ClientsView = () => {
    const [sortDirection, setSortDirection] = useState<
        'asc' | 'desc' | undefined
    >('asc')
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
    const [allClients, setAllClients] = useState(false)

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
                    <div className="flex items-center">
                        <h4 style={{ color: '#01662b' }}>Clientes Activos</h4>
                        <div className="ml-3">
                            <AddClientButton isOpen={toggleAddClientModal} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex mr-5 items-center">
                            <p className="mr-2">Mostrar todos </p>
                            <ShowClientSwitcher
                                allClients={allClients}
                                setAllClients={setAllClients}
                            />
                        </div>
                        <button onClick={toggleSort} className="mr-4">
                            Ordenar A-Z
                            <Sorter sort={sortDirection} />
                        </button>
                    </div>
                </div>
                <DividerMain />
                <ClientsCardList
                    onClientSubmit={handleSubmitClient}
                    sortDirection={sortDirection}
                    allClients={allClients}
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
