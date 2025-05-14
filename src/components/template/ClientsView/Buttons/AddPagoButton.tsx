import { IconButton, Tooltip } from '@mui/material'
import { HiOutlineCash } from 'react-icons/hi'

type AddPagoButtonProps = {
    isOpen: () => void
}

const AddPagoButton: React.FC<AddPagoButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <Tooltip title="Agregar pago" arrow>
                <IconButton onClick={isOpen}>
                    <HiOutlineCash />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddPagoButton
