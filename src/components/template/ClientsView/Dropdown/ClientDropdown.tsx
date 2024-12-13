import React, { useState } from 'react'
import { Dropdown } from '@/components/ui'
import { HiOutlineMenuAlt2, HiOutlineUser } from 'react-icons/hi'
import { Client } from '@/@types/clientInfo'
import { IconButton } from '@mui/material'
import EditButton from '../../EditButton'
import EditClientModal from '../Modal/EditClientModal'
import { fetchClients } from '@/api/api'

type ClientDetailsDropdownProps = {
    client: Client
}

const ClientDetailsDropdown: React.FC<ClientDetailsDropdownProps> = ({
    client,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleEdit = () => {
        fetchClients()
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const ClientAvatar = (
        <IconButton className="flex items-center gap-2">
            <HiOutlineMenuAlt2 />
        </IconButton>
    )

    return (
        <>
            <Dropdown
                menuStyle={{ minWidth: 350, minHeight: 100 }}
                renderTitle={ClientAvatar}
                placement="bottom-start"
            >
                <Dropdown.Item variant="header">
                    <div className=" pl-3 flex items-end justify-between">
                        <div>
                            <p>
                                <strong>Información del Cliente</strong>
                            </p>
                        </div>
                        <EditButton size="small" isOpen={toggleModal} />
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                <Dropdown.Item variant="header">
                    <div className="pb-3 pl-3 flex items-center gap-2">
                        <div>
                            <p>Cond. IVA: {client.ClientIVACond}</p>
                            <p>CUIT/CUIL: {client.ClientCUIT}</p>
                            <p>DNI: {client.ClientDNI}</p>
                            <p>Correo Electrónico: {client.ClientEmail}</p>
                            <p>Teléfono: {client.ClientTel}</p>
                            <p>Dirección: {client.ClientAdress}</p>
                            <p>Estado: {client.ClientStatus}</p>
                        </div>
                    </div>
                </Dropdown.Item>
            </Dropdown>

            <EditClientModal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                clientId={client._id}
                onEditClient={handleEdit}
            />
        </>
    )
}

export default ClientDetailsDropdown
