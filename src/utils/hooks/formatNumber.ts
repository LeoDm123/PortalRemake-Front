const formatNumber = (): ((value: number) => string) => {
    const formatNumber = (value: number): string => {
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        }).format(value)
    }

    return formatNumber
}

export default formatNumber
