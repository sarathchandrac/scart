import { Component, OnInit } from '@angular/core'
import { ProductService } from './../product.service'
import { CategoryService } from '../category.service'
import { ActivatedRoute } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
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
    cart$: Observable<Cart>

    category: string
    subscription: Subscription
    constructor(
        private shoppingCartService: ShoppingCartService,
        private route: ActivatedRoute,
        private productService: ProductService,
        categoryService: CategoryService
    ) {}

    async ngOnInit() {
        this.cart$ = await this.shoppingCartService.getCart()
        this.populateProducts()
    }
    populateProducts() {
        this.subscription = this.productService
            .getAll()
            .pipe(
                switchMap(products => {
                    this.products = products
                    return this.route.queryParamMap
                })
            )
            .subscribe(params => {
                this.category = params.get('category')
                this.applyFilter()
            })
    }
    applyFilter() {
        this.filteredProducts = this.category ? this.products.filter(p => p.category === this.category) : this.products
    }
    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
