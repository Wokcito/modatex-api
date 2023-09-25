/* eslint-disable @typescript-eslint/naming-convention */
import { type StoreDTO } from '../dtos'
import { type Store } from '../models'

const LEADER_STORE = '1'

/**
 * Maps a Store object to a StoreDTO object
 * @param {Store} store
 * @returns {StoreDTO}
 */
export function fromStoreToDTO({ local_cd, cover, slides, profile }: Store): StoreDTO {
	const MEDIA_SERVER = process.env.MEDIA_SERVER as string
	return {
		store_id: parseInt(local_cd),
		name: cover.title,
		reputation: profile.modapoints,
		completed_sales: parseInt(profile.comp_sales),
		completed_sales_percent: profile.comp_sal_perc,
		attempted_sales: parseInt(profile.attempt_sales),
		background: `${MEDIA_SERVER}${cover.background}`,
		logo: `${MEDIA_SERVER}${profile.logo}`,
		minimum: profile.min,
		flash_discount: profile.flash_discount,
		leader: profile.leader === LEADER_STORE,
		slides: slides.map(({ product_id, product, product_normal, price }) => {
			return {
				image_normal: `${MEDIA_SERVER}${product_normal}`,
				image: `${MEDIA_SERVER}${product}`,
				product_id: parseInt(product_id),
				price
			}
		})
	}
}
