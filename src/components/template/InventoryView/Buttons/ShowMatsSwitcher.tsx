import { useCallback } from 'react'
import Switcher from '@/components/ui/Switcher'

type ShowMatSwitcherProps = {
    allMats: boolean
    setAllMats: (value: boolean) => void
}

const ShowMatSwitcher: React.FC<ShowMatSwitcherProps> = ({
    allMats,
    setAllMats,
}) => {
    const onSwitchChange = useCallback(() => {
        setAllMats(!allMats)
    }, [allMats, setAllMats])

    return (
        <div>
            <Switcher defaultChecked={allMats} onChange={onSwitchChange} />
        </div>
    )
}

export default ShowMatSwitcher
