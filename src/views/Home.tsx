import React, { useState, useEffect } from 'react'
import { fetchSalesStats, fetchPayments } from '../api/api'
import HomeCard from '../components/template/HomeView/HomeCard'
import FormatCurrency from '@/utils/hooks/formatCurrency'
import { FormatNumber } from '@/utils/hooks/formatNumber'
import CardStack from '@/components/template/HomeView/CardStack'
import PaymentsChart from '@/components/template/HomeView/PaymentsChart'

const Home = () => {
    return (
        <div>
            <CardStack />
            <PaymentsChart />
        </div>
    )
}

export default Home
