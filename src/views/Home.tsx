import React, { useState, useEffect } from 'react'
import { fetchSalesStats, fetchPayments } from '../api/api'
import HomeCard from '../components/template/HomeView/Cards/HomeCard'
import FormatCurrency from '@/utils/hooks/formatCurrency'
import { FormatNumber } from '@/utils/hooks/formatNumber'
import CardStack from '@/components/template/HomeView/Cards/CardStack'
import PaymentsChart from '@/components/template/HomeView/Charts/PaymentsChart'

const Home = () => {
    return (
        <div>
            <CardStack />
        </div>
    )
}

export default Home
