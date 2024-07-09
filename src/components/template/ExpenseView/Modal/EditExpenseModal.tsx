import { Dialog } from '@/components/ui'
import React from 'react'

interface EditExpenseModalProps {
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    return (
        <div>
            <Dialog isOpen={isOpen} onClose={onClose} width={600}>
                {children}
            </Dialog>
        </div>
    )
}

export default EditExpenseModal
