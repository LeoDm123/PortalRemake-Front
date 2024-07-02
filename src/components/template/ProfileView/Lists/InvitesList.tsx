import React, { useState, useEffect } from 'react'
import Table from '@/components/ui/Table/Table'
import TBody from '@/components/ui/Table/TBody'
import Th from '@/components/ui/Table/Th'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Tr from '@/components/ui/Table/Tr'

type Invite = {
    email: string
}

const InvitesList = () => {
    const [email, setEmail] = useState<string>('')
    const [invites, setInvites] = useState<Invite[]>([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setEmail(user.email || '')
        setInvites(user.invites || [])
        console.log(user.invites)
    }, [])

    return (
        <div style={{ marginTop: 20 }}>
            <h5>Lista de Invitados</h5>
            <Table>
                <THead>
                    <Th>Email</Th>
                    <Th>Actions</Th>
                </THead>
                <TBody>
                    {invites.map((invite, index) => (
                        <Tr key={index}>
                            <Td>{invite.email}</Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default InvitesList
