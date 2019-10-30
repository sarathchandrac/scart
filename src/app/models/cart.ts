import { Item } from './item'
import { Product } from './product'
export class Cart {
    items: Item[] = []
    constructor(public itemsMap: { [productId: string]: Item }) {
        for (let productId in itemsMap) {
            const item = new Item(itemsMap[productId].product, itemsMap[productId].quantity)
            this.items.push(item)
        }
    }

    get totalItemsCount(): number {
        let count = 0
        for (let productId in this.items) {
            count += this.items[productId].quantity
        }
        return count
    }
    get totalPrice(): number {
        let totalPrice = 0
        this.items.forEach(item => {
            totalPrice += item.totalPrice
        })
        return totalPrice
    }
    getQuantity(product: Product): number {
        let item = this.items.find(item => item.product.id === product.id)
        if (!item) return 0
        else return item.quantity
    }
}
