import ClientCard from '@/components/template/ClientsView/Cards/ClientCard'
import ClientListCard from '@/components/template/HomeView/Cards/ClientListCard'
import LogsListCard from '@/components/template/HomeView/Cards/LogsListCard'
import PedidosPerfilesListCard from '@/components/template/HomeView/Cards/PedidosPerfilesListCard'
import PedidosHerrajesListCard from '@/components/template/HomeView/Cards/PedidosHerrajesListCard'
import PedidosVidriosListCard from '@/components/template/HomeView/Cards/PedidosVidriosListCard'

const Home = () => {
    return (
        <div>
            <div className="flex gap-4">
                <div style={{ width: '40%' }}>
                    <ClientListCard />
                </div>
                <div style={{ width: '60%' }}>
                    <LogsListCard />
                </div>
            </div>
            <div className="flex gap-4 pt-4">
                <div style={{ width: '33%' }}>
                    <PedidosPerfilesListCard />
                </div>
                <div style={{ width: '33%' }}>
                    <PedidosHerrajesListCard />
                </div>
                <div style={{ width: '33%' }}>
                    <PedidosVidriosListCard />
                </div>
            </div>
        </div>
    )
}

export default Home
