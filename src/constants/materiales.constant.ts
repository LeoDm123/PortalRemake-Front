import { calculateMaterialCosts } from '@/utils/hooks/useCalculatedCosts'
import formatCurrency from '@/utils/hooks/formatCurrency'
import { Material, Product, Parametro } from '@/@types/calculoCostos'
import { Puerta } from '@/@types/presupuesto'

export const MATERIALS: Material[] = [
    {
        id: 'placaParaiso',
        label: 'Placa Paraiso',
        order: 1,
        products: ['puerta-lustrar'],
    },
    {
        id: 'placaCrudo',
        label: 'Placa Crudo',
        order: 2,
        products: ['puerta-pintar'],
    },
    {
        id: 'relleno',
        label: 'Madera Maciza Relleno',
        order: 3,
        products: ['puerta-lustrar', 'puerta-pintar'],
    },
    {
        id: 'paraiso',
        label: 'Madera Maciza Paraiso',
        order: 4,
        products: ['puerta-lustrar', 'puerta-pintar'],
    },
    {
        id: 'cantoParaiso',
        label: 'Canto Paraiso',
        order: 5,
        products: ['puerta-lustrar', 'marco'],
    },
    {
        id: 'cemento',
        label: 'Cemento de Contacto',
        order: 6,
        products: ['puerta-lustrar', 'puerta-pintar'],
    },
    {
        id: 'cola',
        label: 'Cola Vinílica',
        order: 7,
        products: ['puerta-lustrar', 'puerta-pintar'],
    },
    {
        id: 'thiner',
        label: 'Thiner',
        order: 8,
        products: ['terminacion-lustre', 'terminacion-hidrolaqueado'],
    },
    {
        id: 'lustre',
        label: 'Lustre Poliuretánico',
        order: 9,
        products: ['terminacion-lustre'],
    },
    {
        id: 'pinturaBlanca',
        label: 'Pintura Blanca',
        order: 10,
        products: ['terminacion-hidrolaqueado'],
    },
    {
        id: 'estopa',
        label: 'Estopa',
        order: 11,
        products: ['terminacion-lustre', 'terminacion-hidrolaqueado'],
    },
    {
        id: 'lijas',
        label: 'Lijas',
        order: 12,
        products: ['terminacion-lustre', 'terminacion-hidrolaqueado'],
    },
    {
        id: 'baseGris',
        label: 'Base Gris',
        order: 13,
        products: ['terminacion-hidrolaqueado'],
    },
    {
        id: 'tableroEuca',
        label: 'Tablero Alistonado de Eucalipto',
        order: 14,
        products: ['marco'],
    },
    {
        id: 'burlete',
        label: 'Burlete de Goma',
        order: 15,
        products: ['marco'],
    },
    {
        id: 'paraisoMarco',
        label: 'Suplemento de paraiso para marco',
        order: 16,
        products: ['marco'],
    },
    {
        id: 'alistonadoEuca',
        label: 'Aplique de listones de 1" x 1" (1 cm de separación)',
        order: 17,
        products: ['apliques'],
    },
    {
        id: 'tornillo',
        label: 'Tornillo AMO 7,5 x 100',
        order: 18,
        products: ['colocación'],
    },
    {
        id: 'silicona',
        label: 'Silicona Neutra',
        order: 19,
        products: ['colocación'],
    },
    {
        id: 'espuma',
        label: 'Espuma',
        order: 20,
        products: ['colocación'],
    },
]

export const PRODUCTS: Product[] = [
    {
        id: 'puerta-lustrar',
        label: 'Puerta para lustrar',
        order: 1,
        areaThreshold: 5,
        calculateFixedCost: (variables) => {
            const { PlacaParaiso } = variables
            if (!PlacaParaiso) return { value: 0, formula: '' }

            return {
                value: PlacaParaiso.Costo,
                formula: `Costo fijo Placa Paraiso: ${formatCurrency(PlacaParaiso.Costo)}`,
            }
        },
        calculateVariableCost: (variables: any, margenes: any) => {
            let total = 0
            let formula = ''

            // Calcular costos de materiales usando las funciones reutilizables
            const materiales = [
                calculateMaterialCosts.relleno(variables, margenes),
                calculateMaterialCosts.cantoParaiso(variables, margenes),
                calculateMaterialCosts.cemento(variables, margenes),
                calculateMaterialCosts.cola(variables, margenes),
            ]

            materiales.forEach(({ value, formula: materialFormula }) => {
                if (value > 0) {
                    total += value
                    formula += (formula ? ' + ' : '') + materialFormula
                }
            })

            return {
                value: total,
                formula: formula || 'Sin costo variable',
            }
        },
    },
    {
        id: 'puerta-pintar',
        label: 'Puerta para pintar',
        order: 2,
        areaThreshold: 5,
        calculateFixedCost: (variables) => {
            const { PlacaCrudo } = variables
            if (!PlacaCrudo) return { value: 0, formula: '' }

            return {
                value: PlacaCrudo.Costo,
                formula: `Costo fijo Placa Crudo: ${formatCurrency(PlacaCrudo.Costo)}`,
            }
        },
        calculateVariableCost: (variables: any, margenes: any) => {
            let total = 0
            let formula = ''

            // Calcular costos de materiales usando las funciones reutilizables
            const materiales = [
                calculateMaterialCosts.relleno(variables, margenes),
                calculateMaterialCosts.cantoParaiso(variables, margenes),
                calculateMaterialCosts.cemento(variables, margenes),
                calculateMaterialCosts.cola(variables, margenes),
            ]

            materiales.forEach(({ value, formula: materialFormula }) => {
                if (value > 0) {
                    total += value
                    formula += (formula ? ' + ' : '') + materialFormula
                }
            })

            return {
                value: total,
                formula: formula || 'Sin costo variable',
            }
        },
    },
    {
        id: 'terminacion-lustre',
        label: '3 manos de lustre poliuretánico',
        order: 3,
        areaThreshold: 0,
        calculateFixedCost: () => {
            return { value: 0, formula: '' }
        },
        calculateVariableCost: (variables: any, margenes: any) => {
            let total = 0
            let formula = ''

            // Calcular costos de materiales usando las funciones reutilizables
            const materiales = [
                calculateMaterialCosts.thiner(variables, margenes),
                calculateMaterialCosts.lustre(variables, margenes),
                calculateMaterialCosts.lijas(variables, margenes),
                calculateMaterialCosts.estopa(variables, margenes),
            ]

            materiales.forEach(({ value, formula: materialFormula }) => {
                if (value > 0) {
                    total += value
                    formula += (formula ? ' + ' : '') + materialFormula
                }
            })

            return {
                value: total,
                formula: formula || 'Sin costo variable',
            }
        },
    },
    {
        id: 'terminacion-hidrolaqueado',
        label: '3 manos de hidrolaqueado',
        order: 4,
        areaThreshold: 0,
        calculateFixedCost: () => {
            return { value: 0, formula: '' }
        },
        calculateVariableCost: (variables: any, margenes: any) => {
            let total = 0
            let formula = ''

            // Calcular costos de materiales usando las funciones reutilizables
            const materiales = [
                calculateMaterialCosts.baseGris(variables, margenes),
                calculateMaterialCosts.pinturaBlanca(variables, margenes),
                calculateMaterialCosts.thiner(variables, margenes),
                calculateMaterialCosts.lijas(variables, margenes),
            ]

            materiales.forEach(({ value, formula: materialFormula }) => {
                if (value > 0) {
                    total += value
                    formula += (formula ? ' + ' : '') + materialFormula
                }
            })

            return {
                value: total,
                formula: formula || 'Sin costo variable',
            }
        },
    },
    {
        id: 'marco',
        label: 'Marco de Alistonado de Euca',
        order: 5,
        areaThreshold: 0,
        calculateFixedCost: () => {
            return { value: 0, formula: '' }
        },
        calculateVariableCost: (variables: any, margenes: any) => {
            let total = 0
            let formula = ''

            // Calcular costos de materiales usando las funciones reutilizables
            const materiales = [
                calculateMaterialCosts.tableroEuca(variables, margenes),
                calculateMaterialCosts.paraisoMarco(variables, margenes),
                calculateMaterialCosts.burlete(variables, margenes),
                calculateMaterialCosts.cantoParaiso(variables, margenes),
            ]

            materiales.forEach(({ value, formula: materialFormula }) => {
                if (value > 0) {
                    total += value
                    formula += (formula ? ' + ' : '') + materialFormula
                }
            })

            return {
                value: total,
                formula: formula || 'Sin costo variable',
            }
        },
    },
]

export const DVH = [
    {
        id: '3+3/9/3+3',
        label: 'Lam. 3+3 Inc. / Cámara 9mm. / Lam. 3+3 Inc.',
        vidrios: [
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '3+3/12/3+3',
        label: 'Lam. 3+3 Inc. / Cámara 12mm. / Lam. 3+3 Inc.',
        vidrios: [
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: '3+3OP/9/3+3',
        label: 'Lam. 3+3 Op. / Cámara 9mm. / Lam. 3+3 Inc.',
        vidrios: [
            { id: '3+3OP', label: 'Lam. 3+3 Inc.' },
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '3+3OP/12/3+3',
        label: 'Lam. 3+3 Op. / Cámara 12mm. / Lam. 3+3 Inc.',
        vidrios: [
            { id: '3+3OP', label: 'Lam. 3+3 Op.' },
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: '3+3/9/4',
        label: 'Lam. 3+3 Inc. / Cámara 9mm. / Float 4mm. Inc.',
        vidrios: [
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
            { id: 'V04', label: 'Float 4mm. Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '3+3/12/4',
        label: 'Lam. 3+3 Inc. / Cámara 12mm. / Float 4mm. Inc.',
        vidrios: [
            { id: '3+3', label: 'Lam. 3+3 Inc.' },
            { id: 'V04', label: 'Float 4mm. Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: '4+4/9/4+4',
        label: 'Lam. 4+4 Inc. / Cámara 9mm. / Lam. 4+4 Inc.',
        vidrios: [
            { id: '4+4', label: 'Lam. 4+4 Inc.' },
            { id: '4+4', label: 'Lam. 4+4 Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '4+4/12/4+4',
        label: 'Lam. 4+4 Inc. / Cámara 12mm. / Lam. 4+4 Inc.',
        vidrios: [
            { id: '4+4', label: 'Lam. 4+4 Inc.' },
            { id: '4+4', label: 'Lam. 4+4 Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: '4+4OP/9/4+4',
        label: 'Lam. 4+4 Op. / Cámara 9mm. / Lam. 4+4 Inc.',
        vidrios: [
            { id: '4+4OP', label: 'Lam. 4+4 Inc.' },
            { id: '4+4', label: 'Lam. 4+4 Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '4+4OP/12/4+4',
        label: 'Lam. 4+4 Op. / Cámara 12mm. / Lam. 4+4 Inc.',
        vidrios: [
            { id: '4+4OP', label: 'Lam. 4+4 Op.' },
            { id: '4+4', label: 'Lam. 4+4 Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: '4/9/4',
        label: 'Float 4mm. Inc. / Cámara 9mm. / Float 4mm. Inc.',
        vidrios: [
            { id: 'V04', label: 'Float 4mm. Inc.' },
            { id: 'V04', label: 'Float 4mm. Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '4/12/4',
        label: 'Float 4mm. Inc. / Cámara 12mm. / Float 4mm. Inc.',
        vidrios: [
            { id: 'V04', label: 'Float 4mm. Inc.' },
            { id: 'V04', label: 'Float 4mm. Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: 'OP04/9/4',
        label: 'Float 4mm. Op. / Cámara 9mm. / Float 4mm. Inc.',
        vidrios: [
            { id: 'OP04', label: 'Float 4mm. Inc.' },
            { id: 'V04', label: 'Float 4mm. Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: 'OP04/12/4',
        label: 'Float 4mm. Op. / Cámara 12mm. / Float 4mm. Inc.',
        vidrios: [
            { id: 'OP04', label: 'Float 4mm. Inc.' },
            { id: 'V04', label: 'Float 4mm. Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },

    {
        id: '5/9/5',
        label: 'Float 5mm. Inc. / Cámara 9mm. / Float 5mm. Inc.',
        vidrios: [
            { id: 'V05', label: 'Float 5mm. Inc.' },
            { id: 'V05', label: 'Float 5mm. Inc.' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: '5/12/5',
        label: 'Float 5mm. Inc. / Cámara 12mm. / Float 5mm. Inc.',
        vidrios: [
            { id: 'V05', label: 'Float 5mm. Inc.' },
            { id: 'V05', label: 'Float 5mm. Inc.' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
    {
        id: 'T5/9/T5',
        label: 'Float 5mm. Inc. Templado / Cámara 9mm. / Float 5mm. Inc. Templado',
        vidrios: [
            { id: 'T5', label: 'Float 5mm. Inc. Templado' },
            { id: 'T5', label: 'Float 5mm. Inc. Templado' },
        ],
        camara: { id: 'C09', label: 'Cámara 9mm' },
    },
    {
        id: 'T5/12/T5',
        label: 'Float 5mm. Inc. Templado / Cámara 12mm. / Float 5mm. Inc. Templado',
        vidrios: [
            { id: 'T5', label: 'Float 5mm. Inc. Templado' },
            { id: 'T5', label: 'Float 5mm. Inc. Templado' },
        ],
        camara: { id: 'C12', label: 'Cámara 12mm' },
    },
]
