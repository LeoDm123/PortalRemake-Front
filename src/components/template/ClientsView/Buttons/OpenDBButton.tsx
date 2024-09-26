import { IconButton } from '@mui/material'
import { HiOutlineDatabase } from 'react-icons/hi'

const OpenDBButton = () => {
    return (
        <div>
            <div>
                <IconButton>
                    <HiOutlineDatabase style={{ color: '#01662b' }} />
                </IconButton>
            </div>
        </div>
    )
}

export default OpenDBButton
