import { Item } from './item'
import { Product } from './product'
export class Cart {
    items: Item[] = []
    constructor(public itemsMap: { [itemId: string]: { quantity: number; product: Product } }) {
        for (let itemId in itemsMap) {
            const item = itemsMap[itemId]
            const product = itemsMap[itemId].product
            if (product) {
                let newItem = new Item()
                newItem.$key = itemId
                newItem.quantity = item.quantity
                newItem.title = product.title
                newItem.price = product.price
                newItem.imageUrl = product.imageUrl
                this.items.push(newItem)
            }
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
    getQuantity(product: Item): number {
        let item = this.items.find(item => item.$key === product.$key)
        if (!item) return 0
        else return item.quantity
    }
}
