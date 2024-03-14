import { Button, Dropdown } from '@/components/ui'
import { HiAdjustments, HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'

const PaymentsListSettings = () => {
    return (
        <div>
            <Button className="setting-item" icon={<HiOutlineSearch />} />

            <Button className="setting-item" icon={<HiOutlineFilter />} />
            <Button className="setting-item" icon={<HiAdjustments />} />
        </div>
    )
}

export default PaymentsListSettings
