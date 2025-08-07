export interface CalculatedCost {
    label: string
    value: number
    formula: string
    materialId?: string
    order?: number
    isFixed?: boolean
    isVariable?: boolean
    areaThreshold?: number
    isLabor?: boolean
}

export interface Material {
    id: string
    label: string
    order: number
    products: string[]
}

export interface Parametro {
    id: string
    valorCalculo: number
}

export interface Product {
    id: string
    label: string
    order: number
    areaThreshold: number
    calculateFixedCost: (
        variables: any,
        margenes: any,
    ) => { value: number; formula: string }
    calculateVariableCost: (
        variables: any,
        parametros: any,
        margenes: any,
    ) => {
        value: number
        formula: string
    }
}

export interface GroupedCost {
    product: Product
    costs: CalculatedCost[]
    total: number
}
