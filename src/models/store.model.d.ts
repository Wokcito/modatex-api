export interface Store {
    local_cd: string
    fix: Fix
    cover: Cover
    slides: Slide[]
    profile: Profile
}

interface Cover {
    title: string
    background: string
}

interface Fix {
    colspan: number
    rowspan: number
    coord: string[]
}

interface Profile {
    Ventas: number
    award: number
    flash_discount: boolean
    logo: string
    logoColor: string
    min: number
    leader: string
    modafee: string
    comp_sal_mark: string
    comp_sal_perc: number
    comp_sales: string
    attempt_sales: string
    modapoints: number
    recommended: number
    url_brand: string
}

interface Slide {
    product_id: string
    product_seo: string
    product: string
    product_normal: string
    price: number
}
