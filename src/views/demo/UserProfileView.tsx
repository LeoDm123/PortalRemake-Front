import UserInfoCard from '@/components/template/ProfileView/Cards/UserInfoCard'
import { Card } from '@/components/ui'

const UserProfileView = () => {
    return (
        <div>
            <h2> Perfil de Usuario</h2>
            <div style={{ marginTop: '14px' }}>
                <Card className="card-container">
                    <UserInfoCard />
                </Card>
            </div>
        </div>
    )
}

export default UserProfileView
