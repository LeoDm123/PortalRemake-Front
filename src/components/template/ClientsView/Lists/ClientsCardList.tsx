import React from 'react'
import ClientCard from '../Cards/ClientCard'
import '../clientViewStyles.css'

type ClientsCardListProps = {
    sortDirection: 'asc' | 'desc' | undefined
    onClientSubmit: () => void
}

const ClientsCardList: React.FC<ClientsCardListProps> = ({
    sortDirection,
    onClientSubmit,
}) => {
    return (
        <div className="clients-container">
            <ClientCard
                sortDirection={sortDirection}
                onClientSubmit={onClientSubmit}
            />
        </div>
    )
}

export default ClientsCardList
