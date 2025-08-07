import { useState, useEffect } from 'react'
import { fetchPresPuertas } from '@/api/api'
import { Presupuesto } from '@/@types/presupuesto'

export const usePresPuertas = () => {
    const [presPuertas, setPresPuertas] = useState<Presupuesto[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

    const fetchMaterialData = async () => {
        try {
            const presPuertasData: Presupuesto[] = await fetchPresPuertas()
            setPresPuertas(presPuertasData)
        } catch (error) {
            console.error('Error fetching presupuestos:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMaterialData()
    }, [])

    const toggleExpand = (_id: string) => {
        setExpanded((prevState) => ({
            ...prevState,
            [_id]: !prevState[_id],
        }))
    }

    const getNextCodigo = async (): Promise<string> => {
        try {
            const presupuestos = await fetchPresPuertas()

            const codigos = presupuestos
                .map((p: Presupuesto) => p.Codigo)
                .filter((c: string) => /^PM-\d+$/.test(c))
                .map((c: string) => parseInt(c.split('-')[1], 10))

            const max = codigos.length > 0 ? Math.max(...codigos) : 0
            return `PM-${max + 1}`
        } catch (error) {
            console.error('Error calculando próximo código:', error)
            return 'PM-1'
        }
    }

    return {
        presPuertas,
        loading,
        expanded,
        toggleExpand,
        fetchMateriales: fetchMaterialData,
        getNextCodigo,
    }
}
