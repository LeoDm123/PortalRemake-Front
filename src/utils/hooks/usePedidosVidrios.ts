import { useState, useEffect } from 'react'
import { fetchPedidosVidrios } from '@/api/api'
import { Pedido } from '@/@types/pedidos'

export const usePedidosVidrios = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

    const fetchClientData = async () => {
        try {
            console.log('Fetching clients...')
            const pedidosData: Pedido[] = await fetchPedidosVidrios()
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
