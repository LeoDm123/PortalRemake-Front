import { useState, useEffect } from 'react'
import useFetchUserIncomes from './useFetchUserIncomes'
import useFetchAllIncomes from './usetFetchAllIncomes'

interface Income {
    monto: number
}

const calculateWeightedIncome = () => {
    const incomes: Income[] = useFetchUserIncomes()
    const allIncomes: Income[] = useFetchAllIncomes()

    const calculateTotalIncome = (incomesArray: Income[]): number => {
        return incomesArray.reduce((total, income) => total + income.monto, 0)
    }

    const [totalUserIncome, setTotalUserIncome] = useState<number>(0)
    const [totalIncome, setTotalIncome] = useState<number>(0)
    const [percentage, setPercentage] = useState<number>(0)

    useEffect(() => {
        const userIncome = calculateTotalIncome(incomes)
        const allIncome = calculateTotalIncome(allIncomes)

        setTotalUserIncome(userIncome)
        setTotalIncome(allIncome)

        if (allIncome !== 0) {
            setPercentage((userIncome / allIncome) * 100)
        }
    }, [incomes, allIncomes])

    return {
        totalUserIncome,
        totalIncome,
        percentage,
    }
}

export default calculateWeightedIncome
