import PaymentsList from '@/components/template/TransactionsView/Lists/PaymentsList'
import PaymentsListSettings from '@/components/template/TransactionsView/Settings/PaymentsListSettings'
import { Card } from '@/components/ui'
import '../../components/template/TransactionsView/Transactions.css'

const TransactionsView = () => {
    return (
        <div>
            <div className="tittle-settings-container">
                <h2>Transacciones</h2>
                <PaymentsListSettings />
            </div>
            <div style={{ marginTop: '5px' }}>
                <Card className="card-container">
                    <PaymentsList />
                </Card>
            </div>
        </div>
    )
}

export default TransactionsView
