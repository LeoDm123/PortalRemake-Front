import React, { useEffect, useState } from 'react'
import { fetchActiveClients } from '@/api/api'
import { Client } from '@/@types/clientInfo'

const ClientsList: React.FC = () => {
    const [clientes, setClientes] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getClientes = async () => {
            try {
                const data = await fetchActiveClients()
                setClientes(data)
            } catch (err) {
                setError('Error al obtener los clientes activos')
            } finally {
                setLoading(false)
            }
        }

        getClientes()
    }, [])

    if (loading) return <p>Cargando clientes...</p>
    if (error) return <p>{error}</p>
    if (clientes.length === 0) return <p>No hay clientes activos.</p>

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Clientes Activos</h2>
            <ul className="list-disc pl-5">
                {clientes.map((cliente) => (
                    <li key={cliente._id}>
                        {cliente.ClientName} {cliente.ClientApellido}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ClientsList
