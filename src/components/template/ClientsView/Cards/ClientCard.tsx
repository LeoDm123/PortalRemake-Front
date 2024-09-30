import React from 'react'
import { useClients } from '@/utils/hooks/useClients'
import { calculateTotalDebt } from '@/utils/hooks/calculateDebt'
import ClientCardItem from './ClientCardItem'

const ClientCard: React.FC = () => {
    const { clients, loading, expanded, toggleExpand, fetchClients } =
        useClients()
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {clients
                .filter((client) =>
                    client.Presupuestos.some(
                        (p) => p.Estado === 'Activo' || p.Estado === 'Deudor',
                    ),
                )
                .map((client) => {
                    const totalDebt = calculateTotalDebt(client.Presupuestos)

                    return (
                        <ClientCardItem
                            key={client._id}
                            client={client}
                            expanded={expanded[client._id] || false}
                            onToggleExpand={() => toggleExpand(client._id)}
                            totalDebt={totalDebt}
                            fetchClients={fetchClients}
                        />
                    )
                })}
        </div>
    )
}

export default ClientCard
