import { IconButton, Tooltip } from '@mui/material'
import { HiOutlineBanknotes } from 'react-icons/hi2'

type AddPagoButtonProps = {
    isOpen: () => void
}

const AddPagoButton: React.FC<AddPagoButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <Tooltip title="Agregar pago" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineBanknotes />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddPagoButton
