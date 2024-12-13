import React from 'react'
import ClientCard from '../Cards/ClientCard'
import '../clientViewStyles.css'

type ClientsCardListProps = {
    sortDirection: 'asc' | 'desc' | undefined
    onClientSubmit: () => void
    allClients: boolean
}

const ClientsCardList: React.FC<ClientsCardListProps> = ({
    sortDirection,
    onClientSubmit,
    allClients,
}) => {
    return (
        <div className="clients-container">
            <ClientCard
                sortDirection={sortDirection}
                onClientSubmit={onClientSubmit}
                allClients={allClients}
            />
        </div>
    )
}

export default ClientsCardList
