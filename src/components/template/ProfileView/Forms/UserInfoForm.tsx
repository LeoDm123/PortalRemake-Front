import TextField from '@mui/material/TextField'
import '../ProfileView.css'
import { Button } from '@/components/ui'
import Table from '@/components/ui/Table/Table'
import { TableHead } from '@mui/material'
import Th from '@/components/ui/Table/Th'

const UserInfoForm = () => {
    const LOCAL_STORAGE_USER_KEY: string = 'user'
    const storedUser: any = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '',
    )

    return (
        <div>
            <h4>Datos personales</h4>
            <div className="form-field">
                <TextField
                    fullWidth
                    value={storedUser.userName || ''}
                    id="outlined-multiline-static"
                    label="Nombre y Apellido"
                />
            </div>
            <div className="form-field">
                <TextField
                    fullWidth
                    value={storedUser.email || ''}
                    id="outlined-multiline-static"
                    label="Correo Electrónico"
                />
            </div>
            <div className="save-button">
                <Button
                    shape="round"
                    variant="solid"
                    style={{ backgroundColor: '#152e4d' }}
                >
                    Guardar Datos
                </Button>
            </div>
        </div>
    )
}

export default UserInfoForm
