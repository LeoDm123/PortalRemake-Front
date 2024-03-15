import React, { useState } from 'react'
import PaymentsList from '@/components/template/TransactionsView/Lists/PaymentsList'
import PaymentsListSettings from '@/components/template/TransactionsView/Settings/PaymentsListSettings'
import { Card } from '@/components/ui'
import '../../components/template/TransactionsView/Transactions.css'

const TransactionsView = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (term: string) => {
        setSearchTerm(term)
    }

    return (
        <div>
            <div className="tittle-settings-container">
                <h2>Transacciones</h2>
                <PaymentsListSettings onSearch={handleSearch} />
            </div>
            <div style={{ marginTop: '5px' }}>
                <Card className="card-container">
                    <PaymentsList searchTerm={searchTerm} />
                </Card>
            </div>
        </div>
    )
}

export default TransactionsView
