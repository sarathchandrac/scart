import { Product } from './product'

export class Item {
    $key: string
    title: string
    imageUrl: string
    price: number
    quantity: number
    constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }

    get totalPrice(): number {
        return this.price * this.quantity
    }
}
