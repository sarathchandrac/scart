import { Component, OnInit, OnDestroy } from '@angular/core'
import { ProductService } from './../../product.service'
import { Product } from './../../models/product'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    filteredProducts: Product[]
    products: Product[]
    subscription: Subscription
    productCount = 5
    constructor(private productService: ProductService) {}

    ngOnInit() {
        // this.products$ = this.productService.getAll()
        this.reload('')
    }
    reload(event) {
        this.subscription = this.productService
            .getAll()
            .subscribe(products => (this.filteredProducts = this.products = products))
    }
    filter(query: string) {
        console.log(query)
        if (query) {
            this.filteredProducts = this.products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            )
        } else {
            this.filteredProducts = this.products
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
