export const formatFecha = (fecha: string) => {
    if (!fecha) return ''
    const [año, mes, día] = fecha.split('-')
    return `${día}-${mes}-${año}`
}
