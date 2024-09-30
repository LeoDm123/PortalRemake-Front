import { IconButton } from '@mui/material'
import { HiOutlineCash } from 'react-icons/hi'

type AddPagoButtonProps = {
    isOpen: () => void
}

const AddPagoButton: React.FC<AddPagoButtonProps> = ({ isOpen }) => {
    return (
        <div>
            <IconButton onClick={isOpen}>
                <HiOutlineCash />
            </IconButton>
        </div>
    )
}

export default AddPagoButton
