type Rank = 'premium' | 'black' | 'platinum' | 'gold' | 'blue'
type FieldOrder = 'reputation' | 'minimum' | 'name' | 'sales' | 'sales_percent'
type Order = 'asc' | 'desc'

export interface GetStoresQuery {
    ranks: Rank[]
    name?: string
    order?: Order
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

export const enum ErrorMessages {
	SECTIONS = 'It must be: \'woman\' | \'man\' | \'kids\' | \'xl\' | \'accessories\'',
	ORDERS = 'It must be: \'asc\' | \'desc\'',
	PRODUCTS_FIELD_ORDERS = 'It must be: \'reputation\' | \'discount\' | \'date\' | \'price\'',
    STORES_FIELD_ORDERS = 'It must be: \'reputation\' | \'minimum\' | \'name\' | \'sales\' | \'sales_percent\'',
	NUMERIC = 'It must be a number',
	EXISTS = 'It is required',
	STORE_FILTERS = 'Store filters are not usefull if you pass a storeId',
	STORE_ID = 'If you do not pass a storeId, then search by name is required',
    ACCEPTED_RANKS = 'The ranks must be: \'premium\' | \'black\' | \'platinum\' | \'gold\' | \'blue\'',
    REPEATED_RANKS = 'There are repeated ranks'
}

export const enum QueryFields {
    RANKS = 'ranks',
    NAME = 'name',
    MIN_SALES = 'minSales',
    MIN_SALES_PERCENT = 'minSalesPercent',
    FIELD_ORDER = 'fieldOrder',
    MIN_REPUTATION = 'minReputation',
    MAX_MINIMUM = 'maxMinimum',
    MIN_MINIMUM = 'minMinimum',
    FLASH_DISCOUNT = 'flashDiscount',
	ORDER = 'order',
	START = 'start',
	LIMIT = 'limit',
	SECTIONS = 'sections',
	STORE_ID = 'storeId',
	CATEGORIES = 'categories',
	COLORS = 'colors',
	SIZES = 'sizes',
	MIN_PRICE = 'minPrice',
	MAX_PRICE = 'maxPrice',
	DISCOUNT = 'discount',
	MIN_DISCOUNT = 'minDiscount'
}
