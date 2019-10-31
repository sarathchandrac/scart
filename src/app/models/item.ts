import { Product } from './product'

export class Item {
    $key: string
    title: string
    imageUrl: string
    price: number
    quantity: number

    get totalPrice(): number {
        return this.price * this.quantity
    }
}
