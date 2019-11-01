import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { CheckOutComponent } from './check-out/check-out.component'
import { AuthGaurd } from './auth-gaurd.service'
import { AdminAuthGaurd } from './admin/admin-auth-gaurd.service'
import { ProductsComponent } from './products/products.component'
import { ProductFormComponent } from './admin/product-form/product-form.component'

import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { MyOrdersComponent } from './my-orders/my-orders.component'
import { AdminProductsComponent } from './admin/admin-products/admin-products.component'
import { OrderSuccessComponent } from './order-success/order-success.component'

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },

    { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGaurd] },
    {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGaurd],
    },
    { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGaurd] },

    {
        path: 'admin/product/new',
        component: ProductFormComponent,
        canActivate: [AuthGaurd, AdminAuthGaurd],
    },
    {
        path: 'admin/product/:id',
        component: ProductFormComponent,
        canActivate: [AuthGaurd, AdminAuthGaurd],
    },
    {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGaurd, AdminAuthGaurd],
    },
    {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGaurd, AdminAuthGaurd],
    },
    { path: '**', component: LoginComponent },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],

    exports: [RouterModule],
})
export class AppRoutingModule {}
