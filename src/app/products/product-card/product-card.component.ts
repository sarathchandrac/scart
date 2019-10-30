import { Component, OnInit, Input } from '@angular/core'
import { Product } from './../../models/product'
import { ShoppingCartService } from './../../shopping-cart.service'
import { Item } from './../../models/item'
import { Cart } from './../../models/cart'

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
    @Input() product: Product
    @Input() showActions: boolean
    @Input('shopping-cart') shoppingCart: Cart
    constructor(private shoppingCartService: ShoppingCartService) {}

    addToCart() {
        this.shoppingCartService.addToCart(this.product)
    }
}
