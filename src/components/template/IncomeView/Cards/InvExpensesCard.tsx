import { Card } from '@/components/ui'
import InvExpenseList from '../../ExpenseView/Lists/InvExpenseList'

const InvExpensesCard = () => {
    return (
        <div style={{ marginTop: 20 }}>
            <Card header="Ingresos de Invitados">
                <InvExpenseList />
            </Card>
        </div>
    )
}

export default InvExpensesCard
