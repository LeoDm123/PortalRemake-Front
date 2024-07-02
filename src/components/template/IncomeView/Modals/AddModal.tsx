import { Dialog } from '@/components/ui'
import React from 'react'

interface AddModalProps {
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <div>
            <Dialog isOpen={isOpen} onClose={onClose} width={600}>
                {children}
            </Dialog>
        </div>
    )
}

export default AddModal
