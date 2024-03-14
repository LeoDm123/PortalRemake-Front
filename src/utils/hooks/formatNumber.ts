import { useState } from 'react'

export function FormatNumber(decimales: number = 0) {
    const formatNumber = (numero: number): string => {
        const partes = numero.toFixed(decimales).split('.')
        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return partes.join(',')
    }

    return { formatNumber }
}
