import { Modal } from '@mui/material'
import { Card } from '@/components/ui'
import React, { useState, useEffect } from 'react'
import DividerMain from '../../DividerMain'
import { IconButton } from '@mui/material'
import { HiOutlineXCircle } from 'react-icons/hi'
import EditParamsForm from '../Forms/EditParamsForm'
import { useCostos } from '@/utils/hooks/useCostos'

type EditParamsModalProps = {
    isOpen: boolean
    toggleModal: () => void
    onSubmit: () => void
}

const EditParamsModal: React.FC<EditParamsModalProps> = ({
    isOpen,
    toggleModal,
    onSubmit,
}) => {
    const { parametros, manoObra, costosFijos, margenes, loading } = useCostos()
    const [scrollableContent, setScrollableContent] =
        useState<HTMLDivElement | null>(null)

    useEffect(() => {
        if (scrollableContent) {
            scrollableContent.scrollTop = 0
        }
    }, [isOpen, scrollableContent])

    const handleFormSubmit = () => {
        onSubmit()
        toggleModal()
    }

    if (loading) {
        return (
            <Modal
                open={isOpen}
                onClose={toggleModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={{ zIndex: 30 }}
            >
                <Card
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '65%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>Cargando...</div>
                </Card>
            </Modal>
        )
    }

    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{ zIndex: 30 }}
        >
            <Card
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div className="flex justify-between items-center px-4">
                    <div>
                        <h4 id="modal-title" style={{ color: '#01662b' }}>
                            Editar parámetros y costos
                        </h4>
                        <DividerMain />
                    </div>

                    <IconButton
                        onClick={toggleModal}
                        style={{ color: '#01662b', padding: 0 }}
                        size="large"
                    >
                        <HiOutlineXCircle />
                    </IconButton>
                </div>

                <div
                    ref={setScrollableContent}
                    className="flex-1 overflow-y-auto px-4"
                    style={{ maxHeight: 'calc(100% - 400px)' }}
                >
                    <EditParamsForm
                        parametros={parametros}
                        manoObra={manoObra}
                        costosFijos={costosFijos}
                        margenes={margenes}
                        onSave={handleFormSubmit}
                    />
                </div>
            </Card>
        </Modal>
    )
}

export default EditParamsModal
