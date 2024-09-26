import React from 'react'
import { Dropdown } from '@/components/ui'
import { HiOutlineMenuAlt2, HiOutlineUser } from 'react-icons/hi'
import { Client } from '@/@types/clientInfo'
import { IconButton } from '@mui/material'

type ClientDetailsDropdownProps = {
    client: Client
}

const ClientDetailsDropdown: React.FC<ClientDetailsDropdownProps> = ({
    client,
}) => {
    const ClientAvatar = (
        <IconButton className="flex items-center gap-2">
            <HiOutlineMenuAlt2 />
        </IconButton>
    )

    return (
        <Dropdown
            menuStyle={{ minWidth: 350, minHeight: 100 }}
            renderTitle={ClientAvatar}
            placement="bottom-start"
        >
            <Dropdown.Item variant="header">
                <div className="pt-3 px-3 flex items-center">
                    <div>
                        <p>
                            <strong>Información del Cliente</strong>
                        </p>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            <Dropdown.Item variant="header">
                <div className="pb-3 px-3 flex items-center gap-2">
                    <div>
                        <p>Cond. IVA: {client.ClientIVACond}</p>
                        <p>CUIT/CUIL: {client.ClientCUIT}</p>
                        <p>DNI: {client.ClientDNI}</p>
                        <p>Correo Electrónico: {client.ClientEmail}</p>
                        <p>Teléfono: {client.ClientTel}</p>
                        <p>Dirección: {client.ClientAdress}</p>
                    </div>
                </div>
            </Dropdown.Item>
        </Dropdown>
    )
}

export default ClientDetailsDropdown
