import { Router } from 'express'
import { query } from 'express-validator'
import { getStores } from '../controllers'
import { validationResult } from '../middlewares'
import { ranksValidator } from '../helpers'

export const storesRouter = Router()

const enum QueryFields {
    RANKS = 'ranks',
    NAME = 'name',
    MIN_SALES = 'minSales',
    MIN_SALES_PERCENT = 'minSalesPercent',
    FIELD_ORDER = 'fieldOrder',
    MIN_REPUTATION = 'minReputation',
    MAX_MINIMUM = 'maxMinimum',
    MIN_MINIMUM = 'minMinimum',
    FLASH_DISCOUNT = 'flashDiscount',
	ORDER = 'order'
}

const FIELD_ORDERS = ['reputation', 'minimum', 'name', 'sales', 'sales_percent']
const ORDERS = ['asc', 'desc']

storesRouter.get('/:section', [
	query(QueryFields.RANKS)
		.exists().withMessage('It\'s required')
		.bail()
		.isString().withMessage('It must be a string')
		.bail()
		.custom(ranksValidator)
		.bail(),
	query(QueryFields.NAME)
		.optional()
		.isString().withMessage('It must be a string'),
	query([
		QueryFields.MIN_SALES,
		QueryFields.MIN_SALES_PERCENT,
		QueryFields.MIN_REPUTATION,
		QueryFields.MAX_MINIMUM,
		QueryFields.MIN_MINIMUM,
		QueryFields.FLASH_DISCOUNT
	])
		.optional()
		.isNumeric().withMessage('It must be a number'),
	query(QueryFields.FIELD_ORDER)
		.optional()
		.isString().withMessage('It must be a number')
		.isIn(FIELD_ORDERS).withMessage('It must be: \'reputation\' | \'minimum\' | \'name\' | \'sales\' | \'sales_percent\''),
	query(QueryFields.ORDER)
		.optional()
		.isString().withMessage('It must be a number')
		.isIn(ORDERS).withMessage('It must be: \'asc\' | \'desc\''),
	validationResult
], getStores)
