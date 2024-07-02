import BalanceChartCard from '@/components/template/HomeView/Cards/BalanceChartCard'
import UpcomingExpensesCard from '@/components/template/HomeView/Cards/UpcomingExpensesCard'
import BalanceChart from '@/components/template/HomeView/Charts/BalanceChart'

const Home = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '45%', paddingTop: 15 }}>
                <BalanceChart />
            </div>
            <div style={{ width: '55%', marginLeft: 5 }}>
                <UpcomingExpensesCard />
            </div>
        </div>
    )
}

export default Home
