import { useState, useEffect } from 'react'
import { fetchClients } from '@/api/api'
import { Client } from '@/@types/clientInfo'

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const clientData: Client[] = await fetchClients()
                setClients(clientData)
            } catch (error) {
                console.error('Error fetching clients:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchClientData()
    }, [])

    const toggleExpand = (_id: string) => {
        setExpanded((prevState) => ({
            ...prevState,
            [_id]: !prevState[_id],
        }))
    }

    return { clients, loading, expanded, toggleExpand }
}
