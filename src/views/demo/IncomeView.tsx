import { useState } from 'react'
import AddModal from '@/components/template/IncomeView/Modals/AddModal'
import AddDropdown from '@/components/template/IncomeView/Dropdown/AddDropdown'
import AddIncomeForm from '@/components/template/IncomeView/Modals/Forms/AddIncomeForm'
import AddExpenseForm from '@/components/template/IncomeView/Modals/Forms/AddExpenseForm'
import IncomeCard from '@/components/template/IncomeView/Cards/IncomeCard'
import InvIncomeCard from '@/components/template/IncomeView/Cards/InvIncomeCard'
import ExpensesCard from '@/components/template/IncomeView/Cards/ExpensesCard'

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
            <AddDropdown
                onSelectedValueChange={handleSelectedValueChange}
                onOpenModal={handleOpenModal}
            />
            <AddModal isOpen={isOpen} onClose={handleCloseDialog}>
                {renderModalContent()}
            </AddModal>
            <div>
                <IncomeCard />
                <InvIncomeCard />
            </div>
        </div>
    )
}

export default IncomeView
