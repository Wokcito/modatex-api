export interface StoreDTO {
    store_id: number
    name: string

    reputation: number
    completed_sales: number
    completed_sales_percent: number
    attempted_sales: number

    background: string
    logo: string

    minimum: number
    flash_discount: boolean
    leader: boolean

    slides: SlideDTO[]
}

interface SlideDTO {
    product_id: number
    image: string
    image_normal: string
    price: number
}
