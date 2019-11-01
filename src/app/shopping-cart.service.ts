import { Injectable } from '@angular/core'
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
    DocumentSnapshot,
    Action,
} from '@angular/fire/firestore'
import { Product } from './models/product'
import { Cart } from './models/cart'
import { take, map, tap } from 'rxjs/operators'
import { Item } from './models/item'
import { Observable } from 'rxjs'
import { isNgTemplate } from '@angular/compiler'

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    constructor(private afs: AngularFirestore) {}
    create() {
        console.log('create item')
        return this.afs.collection<any>(`/shopping-carts`).add({
            dateCreated: new Date().getTime(),
            items: [], // Todo: remove
        })
    }

    async getCart(): Promise<Observable<Cart>> {
        let cartId = await this.getOrCreateCartId()
        let cartRef = this.afs.doc<Cart>(`/shopping-carts/${cartId}`)
        return cartRef
            .collection<Item>('/items')
            .snapshotChanges()
            .pipe(
                // tap(console.log),
                map(items => {
                    const obj = {}
                    items.forEach(item => {
                        const data = item.payload.doc.data()
                        obj[item.payload.doc.id] = data
                    })
                    // console.log('object returned -->', obj)
                    return new Cart(obj)
                })
            )
    }

    addToCart(item) {
        this.updateCart(item, 1)
    }

    removeFromCart(item) {
        this.updateCart(item, -1)
    }

    async updateCart(item: Item, change: number) {
        let cartId = await this.getOrCreateCartId()
        console.log('cartId', cartId, item)
        const itemId = item.$key || item['id']

        const item$ = this.getItem(cartId, itemId)
        item$
            .snapshotChanges()
            .pipe(
                take(1),
                map(action => {
                    if (!action.payload) {
                        return null
                    }
                    const data = action.payload.data() as Item
                    const exists = action.payload.exists
                    const id = action.payload.id
                    return { id, exists, ...data }
                })
            )
            .subscribe(p => {
                const quantity = (p.quantity || 0) + change
                if (p.exists) {
                    quantity === 0 ? item$.delete() : item$.update({ quantity })
                } else {
                    item$.set({
                        quantity,
                        title: item.title,
                        imageUrl: item.imageUrl,
                        price: item.price,
                    } as Item)
                }
            })
    }

    async clearCart() {
        const cartId = await this.getOrCreateCartId()
        console.log('clear cart', cartId)
        const cartItems$ = this.getItems(cartId)
        cartItems$
            .snapshotChanges()
            .pipe(
                take(1),
                tap(console.log)
            )
            .subscribe(items => {
                items.forEach(item => {
                    const data = item.payload.doc.data()
                    const itemId = item.payload.doc.id
                    this.deleteItem(cartId, itemId)
                })
            })
    }

    private async getOrCreateCartId() {
        let cartId = localStorage.getItem('cartId')
        if (cartId) return cartId

        let result = await this.create()

        localStorage.setItem('cartId', result.id)
        return result.id
    }

    private getItem(cartId: string, productId: string): AngularFirestoreDocument<Item> {
        return this.afs.doc<Item>(`/shopping-carts/${cartId}/items/${productId}`)
    }

    private getItems(cartId: string): AngularFirestoreCollection<Item> {
        return this.afs.collection<Item>(`/shopping-carts/${cartId}/items`)
    }

    private deleteItem(cartId: string, itemId: string) {
        const item$ = this.getItem(cartId, itemId)
        item$.delete().then(result => {
            console.log('deleted', result)
        })
    }
}
