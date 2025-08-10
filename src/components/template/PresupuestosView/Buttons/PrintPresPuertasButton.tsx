import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { HiOutlinePrinter } from 'react-icons/hi2'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Presupuesto, Puerta } from '@/@types/presupuesto'
import formatCurrency from '@/utils/hooks/formatCurrency'

type PrintPresPuertasButtonProps = {
    presupuesto: Presupuesto
    size: 'small' | 'medium' | 'large'
}

const PrintPresPuertasButton: React.FC<PrintPresPuertasButtonProps> = ({
    presupuesto,
    size,
}) => {
    const generatePDF = async () => {
        try {
            // Crear un elemento temporal para renderizar el contenido del PDF
            const pdfContent = document.createElement('div')
            pdfContent.style.padding = '20px'
            pdfContent.style.fontFamily = 'Arial, sans-serif'
            pdfContent.style.fontSize = '12px'
            pdfContent.style.width = '800px'
            pdfContent.style.backgroundColor = 'white'
            pdfContent.style.color = 'black'

            const generarDescripcionPuerta = (puerta: Puerta): string => {
                const tipoHoja =
                    puerta.Hoja === 'Simple' ? 'una hoja' : `dos hojas`
                const madera =
                    puerta.Placa === 'Placa Enchapada en Paraiso'
                        ? 'enchapada en Paraiso'
                        : 'lisa'
                const tipoMarco =
                    puerta.Placa === 'Placa Enchapada en Paraiso'
                        ? 'enchapada en Paraiso'
                        : ''
                const medidaMarco = puerta.Marco
                const lustre =
                    puerta.Terminacion === 'Lustre'
                        ? 'lustre poliuretánico aplicado'
                        : 'pintura e hidrolaca aplicados'
                const colocacion =
                    puerta.SinColocacion === false ? 'Colocada en obra' : ''

                return `Puerta placa de ${tipoHoja} ${madera} con marco compuesto de ${medidaMarco}" de madera multilaminada ${tipoMarco}. Lustrada con tres manos de ${lustre} con pistola neumática. ${colocacion}.`
            }

            // Generar el contenido HTML del presupuesto
            pdfContent.innerHTML = `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 20px;">
                            <img src="../../public/img/logo/IsoLogo.png" alt="Logo" style="height: 80px;" />
                            <div style="text-align: right; gap: 20px; margin-bottom: 20px;">
                                <p style="margin: 4px 0;">${new Date().toLocaleDateString(
                                    'es-AR',
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    },
                                )}</p>
                                <p style="margin: 4px 0;">Corrientes 2151, Tucumán, Argentina</p>
                                <p style="margin: 4px 0;">+5493815028683</p>
                                <p style="margin: 4px 0;">info@diazmeiners.com</p>
                            </div>
                        </div>
                        <div>
                            <h5 style="margin-bottom: 10px;">Presupuesto de Carpintería en Madera</h5>
                            <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-around;">
                                <p style="text-align: left; margin-right: 4px"><strong>Cliente:</strong> ${presupuesto.Cliente}</p>
                                <p style="text-align: left; margin-right: 4px;"><strong>Obra:</strong> ${presupuesto.Obra}</p>
                                <p style="margin: 4px 0; white-space: nowrap;"><strong>Presupuesto N°:</strong> ${presupuesto.Codigo}</p>
                            </div>
                        </div>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
                        <thead style="background-color: #eee;">
                            <tr>
                                <th style="border: 1px solid #ccc; padding: 8px;">Descripción</th>
                                <th style="border: 1px solid #ccc; padding: 8px;">Dimensiones</th>
                                <th style="border: 1px solid #ccc; padding: 8px;">Precio Unit.</th>
                                <th style="border: 1px solid #ccc; padding: 8px;">Cant.</th>
                                <th style="border: 1px solid #ccc; padding: 8px;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${presupuesto.Puertas.map((p) => {
                                const precio =
                                    p.Precios?.find(
                                        (pr) => pr.Detalle === 'Total',
                                    )?.Precio ?? 0
                                const total = precio * p.Cantidad
                                return `
                                    <tr>
                                        <td style="border: 1px solid #ccc; padding: 8px;">${generarDescripcionPuerta(p)}</td>
                                        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${p.Ancho} x ${p.Alto} [mm]</td>
                                        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">$${precio.toLocaleString()}</td>
                                        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${p.Cantidad}</td>
                                        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">$${total.toLocaleString()}</td>
                                    </tr>
                                `
                            }).join('')}
                        </tbody>
                    </table>

                    <div style="font-size: 12px; color: #666; margin-bottom: 20px;">
                        <p><strong>Nota:</strong> Debido a la gran variedad de ofertas, los herrajes no están incluidos en el presupuesto.</p>
                    </div>

                    <div style="text-align: right; margin-bottom: 20px;">
                        <table style="border-collapse: collapse; width: auto; display: inline-table;">
                            <tr>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">Precio sin Descuento:</td>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">${formatCurrency(presupuesto.Precio)}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">Descuento (${presupuesto.Descuento}%):</td>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">${formatCurrency((presupuesto.Precio * presupuesto.Descuento) / 100)}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">Precio con Descuento:</td>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">${formatCurrency(presupuesto.Precio * (1 - presupuesto.Descuento / 100))}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">IVA:</td>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 8px;">${formatCurrency(presupuesto.IVA)}</td>
                            </tr>
                            <tr style="background-color: #f5f5f5; font-weight: bold;">
                                <td style="border: 1px solid #ccc; text-align: right; padding: 12px;">Precio Final:</td>
                                <td style="border: 1px solid #ccc; text-align: right; padding: 12px;">${formatCurrency(presupuesto.PrecioFinal)}</td>
                            </tr>
                        </table>
                    </div>


                    <div style="font-size: 12px; color: #666; margin-top: 30px;">
                        <p><strong>Validez de la oferta:</strong>
                        <hr/>Este presupuesto es válido solo por un plazo de 7 días a partir de la fecha de emisión y está sujeto a variaciones sin previo aviso.</p>
                        <p><strong>Forma de pago:</strong>
                        <hr/>Se cobrará un anticipo del 65% del precio final (Precio + IVA) para realizar la compra de los materiales requeridos para la fabricación de los productos presupuestados.
                        <hr/>El 35% restante debe ser completamente cancelado previo a entrega o instalación en obra. 
                        <hr/>Por política comercial de planta de vidrios no se puede congelar el precio del vidrio aun con pago anticipado, quedando sujeto a posibles ajustes.</p>
                        <p><strong>Importante:</strong>
                        <hr/>Todos los saldos impagos estan sujetos a actualizaciones. La única forma de congelar los precios es abonando el presupuesto en su totalidad. 
                        <hr/>Los vanos deberán estar correctamente terminados y los contrapisos definidos a la hora de solicitar la medición en obra. 
                        <hr/>El presupuesto no contempla equipos de elevación de carpintería y vidrio en altura y andamios que puedan ser necesarios para realizar la colocación en obra. 
                        <hr/>No se contemplan fletes ni viáticos fuera de San Miguel de Tucumán y Yerba Buena.
                        <hr/>La empresa no se hace cargo en el caso de rotura de vidrios de grandes dimensiones (Mayores a 3 m2).</p>
                    </div>
                `

            // Agregar el contenido temporal al DOM
            document.body.appendChild(pdfContent)

            // Convertir el contenido a canvas
            const canvas = await html2canvas(pdfContent, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
            })

            // Remover el contenido temporal
            document.body.removeChild(pdfContent)

            // Crear el PDF
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')
            const imgWidth = 210
            const pageHeight = 295
            const imgHeight = (canvas.height * imgWidth) / canvas.width
            let heightLeft = imgHeight

            let position = 0

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight
                pdf.addPage()
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
                heightLeft -= pageHeight
            }

            // Descargar el PDF
            pdf.save(`Presupuesto ${presupuesto.Codigo}.pdf`)
        } catch (error) {
            console.error('Error generando PDF:', error)
            alert('Error al generar el PDF. Por favor, intente nuevamente.')
        }
    }

    return (
        <div>
            <Tooltip title="Exportar a PDF" arrow>
                <IconButton size={size} onClick={generatePDF}>
                    <HiOutlinePrinter />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default PrintPresPuertasButton
