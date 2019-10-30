import { Component, OnInit, Input } from '@angular/core'
import { Product } from './../models/product'
import { Cart } from './../models/cart'
import { ShoppingCartService } from './../shopping-cart.service'

@Component({
    selector: 'product-quantity',
    templateUrl: './product-quantity.component.html',
    styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent implements OnInit {
    @Input() product: Product
    @Input('shopping-cart') shoppingCart: Cart
    constructor(private shoppingCartService: ShoppingCartService) {}

    ngOnInit() {}
    addToCart() {
        this.shoppingCartService.addToCart(this.product)
    }
    removeFromCart() {
        this.shoppingCartService.removeFromCart(this.product)
    }
    getQuantity(): number {
        return this.shoppingCart.getQuantity(this.product)
    }
}
