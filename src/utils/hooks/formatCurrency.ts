const FormatCurrency: (locale: string) => (value: number) => string = (
    locale: string,
) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(value)
    }

    return formatCurrency
}

export default FormatCurrency
