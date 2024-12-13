import { useCallback } from 'react'
import Switcher from '@/components/ui/Switcher'

type ShowClientSwitcherProps = {
    allClients: boolean
    setAllClients: (value: boolean) => void
}

const ShowClientSwitcher: React.FC<ShowClientSwitcherProps> = ({
    allClients,
    setAllClients,
}) => {
    const onSwitchChange = useCallback(() => {
        setAllClients(!allClients)
    }, [allClients, setAllClients])

    return (
        <div>
            <Switcher defaultChecked={allClients} onChange={onSwitchChange} />
        </div>
    )
}

export default ShowClientSwitcher
