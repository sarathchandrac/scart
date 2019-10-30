import { Component, OnInit } from '@angular/core'
import { AuthService } from './../core/auth.service'
import { AppUser } from './../models/app-user'
import { ShoppingCartService } from './../shopping-cart.service'
import { Cart } from './../models/cart'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
    appUser: AppUser
    cart$: Observable<Cart>
    constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService) {}

    async ngOnInit() {
        this.authService.appUser$.subscribe(appUser => (this.appUser = appUser))
        this.cart$ = await this.shoppingCartService.getCart()
    }

    logout() {
        console.log('logout with google')
        this.authService.oAuthGoogleLogout()
        console.log('logging out of the Applications')
    }
}
