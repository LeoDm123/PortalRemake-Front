import { useState, useEffect } from 'react'
import { fetchIncomes } from '@/api/api'

interface User {
    email: string
    invites: Invite[]
}

interface Invite {
    email: string
    _id: string
}

interface Income {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    fechaPago: Date
    comentarios: string
}

const useFetchUserIncomes = () => {
    const [incomes, setIncomes] = useState<Income[]>([])

    useEffect(() => {
        const fetchUserIncomes = async (
            userEmail: string,
        ): Promise<Income[]> => {
            try {
                const incomesData = await fetchIncomes(userEmail)
                return Array.isArray(incomesData)
                    ? incomesData
                    : incomesData.ingresos || []
            } catch (error) {
                console.error('Error fetching incomes:', error)
                return []
            }
        }

        const fetchDataForUser = async (email: string) => {
            const userIncomes = await fetchUserIncomes(email)
            return userIncomes
        }

        const fetchIncomesData = async () => {
            const user: User = JSON.parse(localStorage.getItem('user') || '{}')

            const allIncomes: Income[] = []

            const userIncomes = await fetchDataForUser(user.email)
            allIncomes.push(...userIncomes)

            setIncomes(allIncomes)
        }

        fetchIncomesData()
    }, [])

    return incomes
}

export default useFetchUserIncomes
