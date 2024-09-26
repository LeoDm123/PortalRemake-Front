import { IconButton } from '@mui/material'
import { HiOutlineUserAdd } from 'react-icons/hi'

const AddClientButton = () => {
    return (
        <IconButton>
            <HiOutlineUserAdd style={{ color: '#01662b' }} />
        </IconButton>
    )
}

export default AddClientButton
