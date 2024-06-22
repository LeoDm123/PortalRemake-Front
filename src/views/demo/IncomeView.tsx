import { useState } from 'react'
import AddModal from '@/components/template/IncomeView/Modals/AddModal'
import AddDropdown from '@/components/template/IncomeView/Dropdown/AddDropdown'
import AddIncomeForm from '@/components/template/IncomeView/Modals/Forms/AddIncomeForm'
import AddExpenseForm from '@/components/template/ExpenseView/Modal/Forms/AddExpenseForm'
import Tabs from '@/components/ui/Tabs/Tabs'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import TabContent from '@/components/ui/Tabs/TabContent'
import IncomeList from '@/components/template/IncomeView/Lists/IncomeList'
import InvIncomeList from '@/components/template/IncomeView/Lists/InvIncomeList'

const IncomeView = () => {
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
            default:
                return null
        }
    }

    return (
        <div>
            <h4>Ingresos</h4>
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
                    <IncomeList />
                </TabContent>
                <TabContent value="Invitados" style={{ marginTop: 10 }}>
                    <InvIncomeList />
                </TabContent>
            </Tabs>
        </div>
    )
}

export default IncomeView
