const FormatCurrency: () => (value: number) => string = () => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(value)
    }

    return formatCurrency
}

export default FormatCurrency
