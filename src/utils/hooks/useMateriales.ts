import { useState, useEffect } from 'react'
import { fetchMateriales } from '@/api/api'
import { Material } from '@/@types/mats'

export const useMateriales = () => {
    const [materiales, setMateriales] = useState<Material[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

    const fetchMaterialData = async () => {
        try {
            console.log('Fetching materiales...')
            const materialesData: Material[] = await fetchMateriales()
            setMateriales(materialesData)
        } catch (error) {
            console.error('Error fetching materiales:', error)
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

    return {
        materiales,
        loading,
        expanded,
        toggleExpand,
        fetchMateriales: fetchMaterialData,
    }
}
