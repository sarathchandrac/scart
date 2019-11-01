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
import { Order } from './models/order'
import { ShoppingCartService } from './shopping-cart.service'

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private afs: AngularFirestore, private shoppingCartService: ShoppingCartService) {}
    private getOrders(cartId: string): AngularFirestoreCollection<any> {
        return this.afs.collection<any>(`/orders`)
    }
    async placeOrder(order: Order): Promise<firebase.firestore.DocumentReference> {
        const result = await this.afs.collection<Order>(`/orders`).add({ ...order } as Order)
        this.shoppingCartService.clearCart()

        return result
        // item$.add({
        //     //     quantity,
        //     //     title: item.title,
        //     //     imageUrl: item.imageUrl,
        //     //     price: item.price,
        //     // } as Item)
    }
}
