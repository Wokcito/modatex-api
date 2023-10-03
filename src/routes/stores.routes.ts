import { Router } from 'express'
import { query } from 'express-validator'
import { getStores } from '../controllers'
import { validationResult } from '../middlewares'
import { ranksValidator } from '../helpers'
import { QueryFields, ErrorMessages } from '../types'

export const storesRouter = Router()

const FIELD_ORDERS = ['reputation', 'minimum', 'name', 'sales', 'sales_percent']
const ORDERS = ['asc', 'desc']

storesRouter.get('/:section', [
	query(QueryFields.RANKS)
		.exists().withMessage(ErrorMessages.EXISTS)
		.bail()
		.custom(ranksValidator)
		.bail(),
	query(QueryFields.NAME)
		.optional(),
	query([
		QueryFields.MIN_SALES,
		QueryFields.MIN_SALES_PERCENT,
		QueryFields.MIN_REPUTATION,
		QueryFields.MAX_MINIMUM,
		QueryFields.MIN_MINIMUM,
		QueryFields.FLASH_DISCOUNT,
		QueryFields.START,
		QueryFields.LIMIT
	])
		.optional()
		.isNumeric().withMessage(ErrorMessages.NUMERIC),
	query(QueryFields.FIELD_ORDER)
		.optional()
		.isIn(FIELD_ORDERS).withMessage(ErrorMessages.STORES_FIELD_ORDERS),
	query(QueryFields.ORDER)
		.optional()
		.isIn(ORDERS).withMessage(ErrorMessages.ORDERS),
	validationResult
], getStores)
