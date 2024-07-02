import React from 'react'
import { Button } from '@/components/ui'
import { HiAdjustments, HiOutlineFilter } from 'react-icons/hi'
import SearchField from '../Components/Search/SearchField'

interface PaymentsListSettingsProps {
    onSearch: (term: string) => void
}

const PaymentsListSettings: React.FC<PaymentsListSettingsProps> = ({
    onSearch,
}) => {
    return (
        <div className="settings-container">
            <SearchField onSearch={onSearch} />
            <Button className="setting-item" icon={<HiOutlineFilter />} />
            <Button className="setting-item" icon={<HiAdjustments />} />
        </div>
    )
}

export default PaymentsListSettings
