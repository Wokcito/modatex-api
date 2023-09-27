import { type Request, type Response, type NextFunction } from 'express'
import { type GetStoresQuery } from '../interfaces'
import { StoreService } from '../services'

const storeService = new StoreService()

export async function getStores(req: Request, res: Response, next: NextFunction): Promise<void> {
	const section = req.params.section

	const {
		ranks,
		flashDiscount,
		minSales,
		minSalesPercent,
		maxMinimum,
		minMinimum,
		start,
		limit,
		...query
	} = req.query

	const storeQuery = {
		ranks: (decodeURIComponent(ranks as string)).split(','),
		flashDiscount: (flashDiscount as string) === '1',
		minSales: minSales !== undefined ? parseInt(minSales as string) : undefined,
		minSalesPercent: minSalesPercent !== undefined ? parseInt(minSalesPercent as string) : undefined,
		maxMinimum: maxMinimum !== undefined ? parseInt(maxMinimum as string) : undefined,
		minMinimum: minMinimum !== undefined ? parseInt(minMinimum as string) : undefined,
		start: start !== undefined ? parseInt(start as string) : undefined,
		limit: limit !== undefined ? parseInt(limit as string) : undefined,
		...query
	}

	try {
		const stores = await storeService.getStores(section, (storeQuery as unknown) as GetStoresQuery)
		res.json(stores)
	} catch (error) {
		next(error)
	}
}
