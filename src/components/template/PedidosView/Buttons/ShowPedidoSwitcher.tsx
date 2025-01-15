import { useCallback } from 'react'
import Switcher from '@/components/ui/Switcher'

type ShowPedidoSwitcherProps = {
    allPedidos: boolean
    setAllPedidos: (value: boolean) => void
}

const ShowPedidoSwitcher: React.FC<ShowPedidoSwitcherProps> = ({
    allPedidos,
    setAllPedidos,
}) => {
    const onSwitchChange = useCallback(() => {
        setAllPedidos(!allPedidos)
    }, [allPedidos, setAllPedidos])

    return (
        <div>
            <Switcher defaultChecked={allPedidos} onChange={onSwitchChange} />
        </div>
    )
}

export default ShowPedidoSwitcher
