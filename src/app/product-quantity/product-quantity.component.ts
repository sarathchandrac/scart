import { Component, OnInit, Input } from '@angular/core'
import { Product } from './../models/product'
import { Cart } from './../models/cart'
import { ShoppingCartService } from './../shopping-cart.service'
import { Item } from './../models/item'

@Component({
    selector: 'product-quantity',
    templateUrl: './product-quantity.component.html',
    styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent implements OnInit {
    @Input() item: Item
    @Input('shopping-cart') shoppingCart: Cart
    constructor(private shoppingCartService: ShoppingCartService) {}

    ngOnInit() {}
    addToCart() {
        this.shoppingCartService.addToCart(this.item)
    }
    removeFromCart() {
        this.shoppingCartService.removeFromCart(this.item)
    }
    getQuantity(): number {
        return this.shoppingCart.getQuantity(this.item)
    }
}
