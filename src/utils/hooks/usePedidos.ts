import { useState, useEffect } from 'react'
import { fetchClients, fetchPedidosPerfiles } from '@/api/api'
import { Pedido } from '@/@types/pedidos'

export const usePedidos = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

    const fetchClientData = async () => {
        try {
            console.log('Fetching clients...')
            const pedidosData: Pedido[] = await fetchPedidosPerfiles()
            setPedidos(pedidosData)
        } catch (error) {
            console.error('Error fetching pedidos:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClientData()
    }, [])

    const toggleExpand = (_id: string) => {
        setExpanded((prevState) => ({
            ...prevState,
            [_id]: !prevState[_id],
        }))
    }

    return {
        pedidos,
        loading,
        expanded,
        toggleExpand,
        fetchPedidos: fetchClientData,
    }
}
