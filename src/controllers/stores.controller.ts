import { type Request, type Response, type NextFunction } from 'express'
import { type StoresQuery } from '../interfaces'
import { StoreService } from '../services'

const storeService = new StoreService()

export async function getStores(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { ranks, flashDiscount, ...query } = req.query
	const section = req.params.section

	const storeQuery = {
		ranks: (decodeURIComponent(ranks as string)).split(','),
		flashDiscount: (flashDiscount as string) === '1',
		...query
	}

	try {
		const stores = await storeService.getStores(section, (storeQuery as unknown) as StoresQuery)
		res.json(stores)
	} catch (error) {
		next(error)
	}
}
