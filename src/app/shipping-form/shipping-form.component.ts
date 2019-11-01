import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Contact } from './../models/contact'
import { OrderService } from './../order.service'
import { Cart } from './../models/cart'
import { ShoppingCartService } from './../shopping-cart.service'
import { Subscription } from 'rxjs'
import { AuthService } from './../core/auth.service'
import * as firebase from 'firebase/app'
import { Order } from './../models/order'
import { Router } from '@angular/router'

@Component({
    selector: 'shipping-form',
    templateUrl: './shipping-form.component.html',
    styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
    @Input('cart') cart: Cart
    contact: Contact = {
        name: '',
        address1: '',
        address2: '',
        city: '',
    }
    userId: string
    subscription: Subscription

    constructor(private router: Router, private orderService: OrderService, private authService: AuthService) {}

    async ngOnInit() {
        this.subscription = this.authService.user$.subscribe(user => {
            this.userId = user.uid
        })
    }
    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
    async placeOrder(contact: Contact) {
        let orderDetails = new Order(this.userId, this.cart, this.contact)
        console.log('order details', orderDetails)
        const result = await this.orderService.placeOrder(orderDetails)
        this.router.navigate(['/order-success', { id: result.id }])
    }
    cancel() {
        this.contact = {
            name: '',
            address1: '',
            address2: '',
            city: '',
        } as Contact
    }
}
