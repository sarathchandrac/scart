import { Component, OnInit } from '@angular/core'
import { CategoryService } from 'src/app/category.service'
import { ProductService } from './../../product.service'
import { Router, ActivatedRoute } from '@angular/router'
import { take, tap } from 'rxjs/operators'
import { Product } from './../../models/product'

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
    categories$
    id: string
    product: Product = {
        title: '',
        category: '',
        price: 0,
        imageUrl: '',
    }
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        categoryService: CategoryService,
        private productService: ProductService
    ) {
        console.log('load product form -------->')
        this.categories$ = categoryService.getAll()
        this.id = this.route.snapshot.paramMap.get('id')
        console.log('id', this.id)
        if (this.id) {
            this.productService
                .get(this.id)
                .pipe(
                    take(1),
                    tap(console.log)
                )
                .subscribe(p => (this.product = p))
        }
    }

    ngOnInit() {}
    save(product) {
        console.log('product', product)

        if (this.id) {
            this.productService.update(this.id, product).then(this.navigateToProductsDashboard())
        } else {
            this.productService.create(product).then(this.navigateToProductsDashboard())
        }
    }

    delete() {
        if (!confirm('Are you sure you want to delete the product')) {
            return
        }
        this.productService.delete(this.id).then(this.navigateToProductsDashboard())
    }
    navigateToProductsDashboard() {
        this.router.navigate(['/admin/products'])
        return null
    }
}
