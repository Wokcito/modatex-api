export interface StoresQuery {
    ranks: Rank[]
    name?: string
    order?: string
    minSales?: number
    minSalesPercent?: number
    fieldOrder?: FieldOrder
    minReputation?: number
    maxMinimum?: number
    minMinimum?: number
    flashDiscount?: boolean
    start?: number
    limit?: number
}

type Rank = 'premium' | 'black' | 'platinum' | 'gold' | 'blue'
type FieldOrder = 'reputation' | 'minimum' | 'name' | 'sales' | 'sales_percent'
type Order = 'asc' | 'desc'
