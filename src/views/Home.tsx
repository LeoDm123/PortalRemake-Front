import ClientCard from '@/components/template/ClientsView/Cards/ClientCard'
import ClientListCard from '@/components/template/HomeView/Cards/ClientListCard'

const Home = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '45%', paddingTop: 15 }}>
                <ClientListCard />
            </div>
            <div style={{ width: '55%', marginLeft: 5 }}></div>
        </div>
    )
}

export default Home
