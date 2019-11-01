import { Component, OnInit, Input } from '@angular/core'
import { ShoppingCartService } from './../shopping-cart.service'
import { Cart } from './../models/cart'

@Component({
    selector: 'cart-summary',
    templateUrl: './cart-summary.component.html',
    styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {
    @Input() cart: Cart

    constructor() {}
}
