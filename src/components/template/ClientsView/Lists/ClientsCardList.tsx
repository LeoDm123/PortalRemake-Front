import React from 'react'
import ClientCard from '../Cards/ClientCard'
import '../clientViewStyles.css'

type ClientsCardListProps = {
    sortDirection: 'asc' | 'desc' | undefined
}

const ClientsCardList: React.FC<ClientsCardListProps> = ({ sortDirection }) => {
    return (
        <div className="clients-container">
            <ClientCard sortDirection={sortDirection} />
        </div>
    )
}

export default ClientsCardList
