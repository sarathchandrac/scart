import { Item } from './item'
import { Product } from './product'
export class Cart {
    items: Item[] = []
    constructor(private itemsMap: { [itemId: string]: Item }) {
        for (let itemId in itemsMap) {
            const item = itemsMap[itemId]
            if (item) {
                this.items.push(
                    new Item({
                        ...item,
                        $key: itemId,
                    })
                )
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
        const itemId = product.$key || product['id']
        let item = this.items.find(item => item.$key === itemId)
        if (!item) return 0
        else {
            return item.quantity
        }
    }
}
