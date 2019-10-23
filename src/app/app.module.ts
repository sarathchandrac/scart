import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { LoginComponent } from './login/login.component'
import { UserLoginComponent } from './users/user-login/user-login.component'
import { UserProfileComponent } from './users/user-profile/user-profile.component'
import { AuthService } from './core/auth.service'

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment'
import { AuthGaurd } from './auth-gaurd.service'
import { CheckOutComponent } from './check-out/check-out.component'
import { ProductsComponent } from './products/products.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { OrderSuccessComponent } from './order-success/order-success.component'
import { MyOrdersComponent } from './my-orders/my-orders.component'
import { AdminProductsComponent } from './admin/admin-products/admin-products.component'
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component'
import { UserService } from './user.service'
import { CategoryService } from './category.service'
import { AdminAuthGaurd } from './admin/admin-auth-gaurd.service'
import { ProductService } from './product.service'
import { ProductFormComponent } from './admin/product-form/product-form.component'
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavBarComponent,
        LoginComponent,
        UserLoginComponent,
        UserProfileComponent,
        CheckOutComponent,
        ProductsComponent,
        ShoppingCartComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        FormsModule,
        CustomFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ],

    providers: [AuthService, AuthGaurd, UserService, AdminAuthGaurd, CategoryService, ProductService],
    bootstrap: [AppComponent],
})
export class AppModule {}
