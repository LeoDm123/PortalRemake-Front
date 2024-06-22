import React from 'react'
import { HiDocumentAdd } from 'react-icons/hi'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { Dropdown } from '@/components/ui'

const DateDropdown: React.FC<{
    onSelectedValueChange: (value: string) => void
    onOpenModal: (type: string) => void
}> = ({ onSelectedValueChange, onOpenModal }) => {
    const handleSelectedValueChange = (value: any) => {
        onSelectedValueChange(value)
        onOpenModal(value)
    }

    const renderTitle = () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <HiDocumentAdd size={'30px'} />
        </div>
    )

    return (
        <div>
            <Dropdown title="Periodo" onSelect={handleSelectedValueChange}>
                <DropdownItem eventKey="Semana">Semana</DropdownItem>
                <DropdownItem eventKey="Mes">Mes</DropdownItem>
                <DropdownItem eventKey="Año">Año</DropdownItem>
            </Dropdown>
        </div>
    )
}

export default DateDropdown
