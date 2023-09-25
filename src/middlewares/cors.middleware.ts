import { type Request, type Response, type NextFunction } from 'express'

const ORIGIN_HEADER = 'Origin'
const ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin'
const ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods'
const METHODS = 'GET'

const ACCEPTED_ORIGINS: string[] = ['*']

export function cors() {
	return (req: Request, res: Response, next: NextFunction) => {
		const origin = req.header(ORIGIN_HEADER)

		if (origin === undefined || ACCEPTED_ORIGINS.includes(origin)) {
			res.header(ACCESS_CONTROL_ALLOW_ORIGIN, origin)
			res.header(ACCESS_CONTROL_ALLOW_METHODS, METHODS)
			next()
		}
	}
}
