import { IconButton, Tooltip } from '@mui/material'
import { HiOutlineDatabase } from 'react-icons/hi'

const OpenDBButton = () => {
    return (
        <div>
            <div>
                <Tooltip title="Abrir base de datos" arrow>
                    <IconButton>
                        <HiOutlineDatabase style={{ color: '#01662b' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default OpenDBButton
