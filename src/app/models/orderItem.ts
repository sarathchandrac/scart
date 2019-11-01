import { Product } from './product'

export interface OrderItem {
    product: Product
    totalPrice: number
    quantity: number
}
