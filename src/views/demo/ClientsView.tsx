import AddClientButton from '@/components/template/ClientsView/Buttons/AddClientButton'
import OpenDBButton from '@/components/template/ClientsView/Buttons/OpenDBButton'
import ClientsCardList from '@/components/template/ClientsView/Lists/ClientsCardList'
import DividerMain from '@/components/template/DividerMain'

const ClientsView = () => {
    return (
        <div>
            <div className="mb-2 flex justify-between items-center">
                <h4 style={{ color: '#01662b' }}>Clientes Activos</h4>
                <div className="flex">
                    <AddClientButton />
                    <OpenDBButton />
                </div>
            </div>
            <DividerMain />
            <ClientsCardList />
        </div>
    )
}

export default ClientsView
