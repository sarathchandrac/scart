import { Cart } from './cart'
import { Contact } from './contact'
import { OrderItem } from './orderItem'
import { Product } from './product'

export class Order {
    dateCreated: number
    items: any
    constructor(public userId: string, cart: Cart, public contact: Contact) {
        this.dateCreated = new Date().getTime()
        this.items = this.getItems(cart)
    }
    getItems(cart) {
        return cart.items.map(item => {
            return {
                product: {
                    title: item.title,
                    price: item.price,
                    imageUrl: item.imageUrl,
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            }
        })
    }
}
