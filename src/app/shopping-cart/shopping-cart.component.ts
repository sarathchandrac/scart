import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from './../shopping-cart.service'
import { Observable } from 'rxjs'
import { Cart } from './../models/cart'

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
    cart$: Observable<Cart>

    constructor(private shoppingCartService: ShoppingCartService) {}

    async ngOnInit() {
        this.cart$ = await this.shoppingCartService.getCart()
    }
    clearCart() {}
}
