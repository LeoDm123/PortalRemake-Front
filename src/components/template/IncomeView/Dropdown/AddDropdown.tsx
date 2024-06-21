import React, { useState } from 'react'
import { HiDocumentAdd } from 'react-icons/hi'
import HomeAddDropdown from './HomeAddDropdown'
import DropdownItem from './DropdownItem'

const AddDropdown: React.FC<{
    onSelectedValueChange: (value: string) => void
    onOpenModal: (type: string) => void
}> = ({ onOpenModal }) => {
    const handleSelectedValueChange = (value: any) => {
        onOpenModal(value)
    }

    const renderTitle = () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <HiDocumentAdd size={'30px'} />
        </div>
    )

    return (
        <div>
            <HomeAddDropdown
                title={renderTitle()}
                onSelectedValueChange={handleSelectedValueChange}
            >
                <DropdownItem eventKey="Income">Ingreso</DropdownItem>
                <DropdownItem eventKey="Expense">Gasto</DropdownItem>
            </HomeAddDropdown>
        </div>
    )
}

export default AddDropdown
