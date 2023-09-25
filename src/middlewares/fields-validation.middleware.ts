import { type Request, type Response, type NextFunction } from 'express'
import { validationResult as result } from 'express-validator'

export function validationResult(req: Request, res: Response, next: NextFunction): void {
	const errors = result(req)
	if (!errors.isEmpty()) {
		res.status(400).json(errors)
	}
	next()
}
