import { Component, OnInit } from '@angular/core'
import { ProductService } from './../product.service'
import { CategoryService } from '../category.service'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { OnDestroy } from '@angular/core'
import { switchMap } from 'rxjs/operators'
import { Product } from './../models/product'
import { ShoppingCartService } from './../shopping-cart.service'
import { Cart } from './../models/cart'

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = []
    filteredProducts: Product[] = []
    cart = new Cart({})

    category: string
    subscription: Subscription
    cartSubscription: Subscription
    constructor(
        private shoppingCartService: ShoppingCartService,
        route: ActivatedRoute,
        productService: ProductService,
        categoryService: CategoryService
    ) {
        this.subscription = productService
            .getAll()
            .pipe(
                switchMap(products => {
                    this.products = products
                    return route.queryParamMap
                })
            )
            .subscribe(params => {
                this.category = params.get('category')
                this.filteredProducts = this.category
                    ? this.products.filter(p => p.category === this.category)
                    : this.products
            })
    }

    async ngOnInit() {
        this.cartSubscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
            this.cart = cart
        })

        // console.log('ref --->', ref)
    }
    ngOnDestroy() {
        this.subscription.unsubscribe()
        this.cartSubscription.unsubscribe()
    }
}
