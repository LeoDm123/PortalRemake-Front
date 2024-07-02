import { useState } from 'react'
import AddModal from '@/components/template/IncomeView/Modals/AddModal'
import AddDropdown from '@/components/template/IncomeView/Dropdown/AddDropdown'
import AddIncomeForm from '@/components/template/IncomeView/Modals/Forms/AddIncomeForm'
import AddExpenseForm from '@/components/template/ExpenseView/Modal/Forms/AddExpenseForm'
import Tabs from '@/components/ui/Tabs/Tabs'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import TabContent from '@/components/ui/Tabs/TabContent'
import ExpenseList from '@/components/template/ExpenseView/Lists/ExpenseList'
import InvExpenseList from '@/components/template/ExpenseView/Lists/InvExpenseList'
import AddBudgetForm from '@/components/template/BudgetView/Modal/Forms/AddBudgetForm'
import BudgetList from '@/components/template/BudgetView/Lists/BudgetList'
import InvBudgetList from '@/components/template/BudgetView/Lists/InvBudgetList'

const BudgetView = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalType, setModalType] = useState('')

    const handleOpenModal = (type: string) => {
        setModalType(type)
        setIsOpen(true)
    }

    const handleCloseDialog = () => {
        setIsOpen(false)
        setModalType('')
    }

    const handleSelectedValueChange = (value: string) => {
        console.log('Selected value:', value)
    }

    const renderModalContent = () => {
        switch (modalType) {
            case 'Income':
                return (
                    <div>
                        <AddIncomeForm onClose={handleCloseDialog} />
                    </div>
                )
            case 'Expense':
                return (
                    <div>
                        <AddExpenseForm onClose={handleCloseDialog} />
                    </div>
                )
            case 'Budget':
                return (
                    <div>
                        <AddBudgetForm onClose={handleCloseDialog} />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div>
            <h4>Presupuestos</h4>
            <div style={{ position: 'absolute', right: 25 }}>
                <AddDropdown
                    onSelectedValueChange={handleSelectedValueChange}
                    onOpenModal={handleOpenModal}
                />
            </div>
            <AddModal isOpen={isOpen} onClose={handleCloseDialog}>
                {renderModalContent()}
            </AddModal>
            <Tabs defaultValue="Propios">
                <TabList>
                    <TabNav value="Propios">Propios</TabNav>
                    <TabNav value="Invitados">Invitados</TabNav>
                </TabList>
                <TabContent value="Propios" style={{ marginTop: 10 }}>
                    <BudgetList />
                </TabContent>
                <TabContent value="Invitados" style={{ marginTop: 10 }}>
                    <InvBudgetList />
                </TabContent>
            </Tabs>
        </div>
    )
}

export default BudgetView
