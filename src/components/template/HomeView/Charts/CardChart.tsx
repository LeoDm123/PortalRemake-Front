import React, { useState } from 'react'
import { HiOutlineCalendar } from 'react-icons/hi'
import { usePaymentsData } from '../../Hooks/usePaymentData'
import { useChartData } from '../../Hooks/useChartData'
import { LineChart } from '@mui/x-charts'

const CardChart: React.FC<{
    onSelectedValue: string
}> = ({ onSelectedValue }) => {
    const LOCAL_STORAGE_USER_KEY = 'user'
    const storedUserJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    const storedUser = storedUserJson ? JSON.parse(storedUserJson) : {}

    const [currentPage, setCurrentPage] = useState<number>(1)
    const payments = usePaymentsData(storedUser.id, currentPage)
    const chartData = useChartData(payments, onSelectedValue)

    const renderTitle = () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <HiOutlineCalendar size={'30px'} />
        </div>
    )

    return (
        <div>
            <LineChart
                bottomAxis={{ disableLine: true }}
                leftAxis={{ disableLine: true }}
                xAxis={[{ data: chartData.dates }]}
                series={[
                    {
                        data: chartData.netoValues,
                        color: '#fff',
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    )
}

export default CardChart
