import { Calendar } from '@/components/ui'
import React, { useEffect, useState } from 'react'

interface Expense {
    _id: string
    categoria: string
    subCategoria: string
    divisa: string
    monto: number
    repetir: string
    cuotas: number
    fechaPago: Date
    comentarios: string
}

const MonthCalendar = () => {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [paymentDates, setPaymentDates] = useState<Date[]>([])

    useEffect(() => {
        // Aquí puedes obtener tus gastos desde una API o base de datos
        // Por ahora, usaré datos estáticos como ejemplo
        const exampleExpenses: Expense[] = [
            {
                _id: '1',
                categoria: 'Food',
                subCategoria: 'Groceries',
                divisa: 'USD',
                monto: 100,
                repetir: 'Mensualmente',
                cuotas: 1,
                fechaPago: new Date('2024-06-01'), // Ajusta la fecha según tus datos
                comentarios: 'Grocery shopping',
            },
            {
                _id: '2',
                categoria: 'Transport',
                subCategoria: 'Gas',
                divisa: 'USD',
                monto: 50,
                repetir: 'Mensualmente',
                cuotas: 1,
                fechaPago: new Date('2024-06-15'), // Ajusta la fecha según tus datos
                comentarios: 'Gas for car',
            },
            // Agrega más gastos según sea necesario
        ]

        setExpenses(exampleExpenses)
        setPaymentDates(exampleExpenses.map((expense) => expense.fechaPago))
    }, [])

    return (
        <div>
            <Calendar value={paymentDates} multipleSelection />
        </div>
    )
}

export default MonthCalendar
