const formatCurrency = (): ((value: number) => string) => {
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(value)
    }

    return formatCurrency
}

export default formatCurrency
