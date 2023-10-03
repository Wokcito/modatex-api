import axios from 'axios'

import { type StoreDTO } from '../dtos'
import { type Store } from '../models'
import { type GetStoresQuery } from '../types'
import { fromStoreToDTO } from '../mappers'

const FIELD_MINIMUM = 'minimum'
const FIELD_REPUTATION = 'reputation'
const FIELD_SALES = 'sales'
const FIELD_SALES_PERCENT = 'sales_percent'
const FIELD_NAME = 'name'
const ORDER_ASCENDENT = 'asc'

interface Result {
	recordsFiltered: number
	data: StoreDTO[]
}

export class StoreService {
	public async getStores(section: string, filters: GetStoresQuery): Promise<Result> {
		const { ranks } = filters
		const storesData = await Promise.all(ranks.map(async rank => await this.fetchStoresData(section, rank)))
		const allStores: StoreDTO[] = []

		storesData.forEach(stores => {
			stores.forEach(store => {
				allStores.push(fromStoreToDTO(store))
			})
		})

		return this.filter(allStores, filters)
	}

	private async fetchStoresData(section: string, rank: string): Promise<Store[]> {
		const BASE_URL = process.env.MT3 as string
		const { data } = await axios.get<{ stores: Store[] }>(`${BASE_URL}json/cache_${section}_${rank}.json`)

		return data.stores
	}

	/**
	 * Apply the filters and returns the filtered stores
	 * @param { StoreDTO[] } stores
	 * @param { Partial<GetStoresDTO> } filters
	 * @returns { StoreDTO[] }
	 */
	private filter(
		stores: StoreDTO[],
		{
			flashDiscount,
			minReputation,
			name,
			minMinimum,
			maxMinimum,
			minSales,
			minSalesPercent,
			fieldOrder,
			order,
			limit,
			start = 0
		}: GetStoresQuery
	): Result {
		if (flashDiscount !== false) stores = this.flashDiscountFilter(stores)
		if (minReputation !== undefined) stores = this.reputationFilter(stores, minReputation)
		if (name !== undefined) stores = this.nameFilter(stores, name)
		if (minMinimum !== undefined) stores = this.minMinimumFilter(stores, minMinimum)
		if (maxMinimum !== undefined) stores = this.maxMinimumFilter(stores, maxMinimum)
		if (minSales !== undefined) stores = this.salesFilter(stores, minSales)
		if (minSalesPercent !== undefined) stores = this.salesPercentFilter(stores, minSalesPercent)

		if (fieldOrder === FIELD_MINIMUM) {
			stores.sort((a, b) =>
				order === undefined || order === ORDER_ASCENDENT
					? a.minimum - b.minimum
					: b.minimum - a.minimum)
		}
		if (fieldOrder === FIELD_REPUTATION) {
			stores.sort((a, b) =>
				order === undefined || order === ORDER_ASCENDENT
					? a.reputation - b.reputation
					: b.reputation - a.reputation)
		}
		if (fieldOrder === FIELD_SALES) {
			stores.sort((a, b) =>
				order === undefined || order === ORDER_ASCENDENT
					? a.completed_sales - b.completed_sales
					: b.completed_sales - a.completed_sales
			)
		}
		if (fieldOrder === FIELD_NAME) {
			stores.sort((a, b) =>
				order === undefined || order === ORDER_ASCENDENT
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			)
		}
		if (fieldOrder === FIELD_SALES_PERCENT) {
			stores.sort((a, b) =>
				order === undefined || order === ORDER_ASCENDENT
					? a.completed_sales_percent - b.completed_sales_percent
					: b.completed_sales_percent - a.completed_sales_percent
			)
		}

		const storesQuantity = stores.length

		stores = limit === undefined ? stores.slice(start) : stores.slice(start, start + limit)

		return {
			recordsFiltered: storesQuantity,
			data: stores
		}
	}

	/**
	 * Returns the stores with flash discount
	 * @param { StoreDTO[] } stores
	 * @returns { StoreDTO[] }
	 */
	private flashDiscountFilter(stores: StoreDTO[]): StoreDTO[] {
		return stores.filter(store => store.flash_discount)
	}

	/**
	 * Returns the stores that have higher reputation than the given minReputation
	 * @param { StoreDTO[] } stores
	 * @param { number } minReputation
	 * @returns { StoreDTO[] }
	 */
	private reputationFilter(stores: StoreDTO[], minReputation: number): StoreDTO[] {
		return stores.filter(store => store.minimum >= minReputation)
	}

	/**
	 * Returns the stores that match with the given name
	 * @param { StoreDTO[] } stores
	 * @param { string } name
	 * @returns { StoreDTO[] }
	 */
	private nameFilter(stores: StoreDTO[], name: string): StoreDTO[] {
		const nameRegExp = new RegExp(name, 'i')
		return stores.filter(store => nameRegExp.test(store.name))
	}

	/**
	 * Returns the stores that have a lower Minimum than the given maxMinimum
	 * @param { StoreDTO[] } stores
	 * @param { number } maxMinimum
	 * @returns { StoreDTO[] }
	 */
	private maxMinimumFilter(stores: StoreDTO[], maxMinimum: number): StoreDTO[] {
		return stores.filter(store => store.minimum <= maxMinimum)
	}

	/**
	 * Returns the stores that have a highier Minimum than the given minMinimum
	 * @param { StoreDTO[] } stores
	 * @param { number } minMinimum
	 * @returns { StoreDTO[] }
	 */
	private minMinimumFilter(stores: StoreDTO[], minMinimum: number): StoreDTO[] {
		return stores.filter(store => store.minimum >= minMinimum)
	}

	/**
	 * Returns the stores that have more sales than the given minSales
	 * @param { StoreDTO[] } stores
	 * @param { number } minSales
	 * @returns { StoreDTO[] }
	 */
	private salesFilter(stores: StoreDTO[], minSales: number): StoreDTO[] {
		return stores.filter(store => store.completed_sales >= minSales)
	}

	/**
	 * Returns the stores that have more completed sales percents than the given minSalesPercent
	 * @param { StoreDTO[] } stores
	 * @param { number } minSalesPercent
	 * @returns { StoreDTO[] }
	 */
	private salesPercentFilter(stores: StoreDTO[], minSalesPercent: number): StoreDTO[] {
		return stores.filter(store => store.completed_sales_percent >= minSalesPercent)
	}
}
