import { Modal } from '@mui/material'
import { Card, Button, Input } from '@/components/ui'
import React, { useRef, useState } from 'react'
import DividerMain from '@/components/template/DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import AddMatListForm from '../Forms/AddMatListForm'
import InventarioLogList from '../Lists/InventarioLogList'

type InventarioLogModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onDelete: () => void
}

const InventarioLogModal: React.FC<InventarioLogModalProps> = ({
    isOpen,
    toggleModal,
    onDelete,
}) => {
    const submitRef = useRef<() => void>(() => {})
    const [searchTerm, setSearchTerm] = useState<string>('')

    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{ zIndex: 1000 }}
        >
            <Card
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <h4 id="modal-title" style={{ color: '#01662b' }}>
                                Ingresos/Egresos de materiales
                            </h4>
                            <DividerMain />
                        </div>
                    </div>

                    <div>
                        <Input
                            size="sm"
                            type="text"
                            placeholder="Buscar por código, descripción, tipo de movimiento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-96"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <IconButton
                            onClick={toggleModal}
                            style={{ color: '#01662b', padding: 0 }}
                            size="large"
                        >
                            <HiOutlineXCircle />
                        </IconButton>
                    </div>
                </div>

                <InventarioLogList
                    onClose={toggleModal}
                    searchTerm={searchTerm}
                    onDelete={onDelete}
                />
            </Card>
        </Modal>
    )
}

export default InventarioLogModal
