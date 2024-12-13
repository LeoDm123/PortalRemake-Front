import React, { useEffect } from 'react'
import { useClients } from '@/utils/hooks/useClients'
import { calculateTotalDebt } from '@/utils/hooks/calculateClientDebt'
import ClientCardItem from './ClientCardItem'
import { Skeleton } from '@/components/ui'

type ClientCardProps = {
    sortDirection: 'asc' | 'desc' | undefined
    onClientSubmit: () => void
    allClients: boolean
}

const ClientCard: React.FC<ClientCardProps> = ({
    sortDirection,
    onClientSubmit,
    allClients,
}) => {
    const { clients, loading, expanded, toggleExpand, fetchClients } =
        useClients()

    useEffect(() => {
        fetchClients()
    }, [onClientSubmit, fetchClients])

    if (loading) {
        return (
            <div>
                {Array.from(new Array(5)).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={100}
                        style={{ marginBottom: '10px' }}
                    />
                ))}
            </div>
        )
    }

    const filteredClients = allClients
        ? clients
        : clients.filter((client) => client.ClientStatus === 'Activo')

    const sortedClients = filteredClients.sort((a, b) => {
        const lastNameA = a.ClientApellido?.toLowerCase() || ''
        const lastNameB = b.ClientApellido?.toLowerCase() || ''
        const firstNameA = a.ClientName.toLowerCase()
        const firstNameB = b.ClientName.toLowerCase()

        if (lastNameA && lastNameB) {
            if (sortDirection === 'asc') {
                return lastNameA.localeCompare(lastNameB)
            }
            if (sortDirection === 'desc') {
                return lastNameB.localeCompare(lastNameA)
            }
        }

        if (!lastNameA && lastNameB) {
            if (sortDirection === 'asc') {
                return firstNameA.localeCompare(lastNameB)
            }
            if (sortDirection === 'desc') {
                return lastNameB.localeCompare(firstNameA)
            }
        }

        if (lastNameA && !lastNameB) {
            if (sortDirection === 'asc') {
                return lastNameA.localeCompare(firstNameB)
            }
            if (sortDirection === 'desc') {
                return firstNameB.localeCompare(lastNameA)
            }
        }

        if (sortDirection === 'asc') {
            return firstNameA.localeCompare(firstNameB)
        }
        if (sortDirection === 'desc') {
            return firstNameB.localeCompare(firstNameA)
        }

        return 0
    })

    return (
        <div>
            {sortedClients.map((client) => {
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
