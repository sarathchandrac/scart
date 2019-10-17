import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { AppUser } from './../models/app-user';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    appUser: AppUser;
    constructor(public authService: AuthService) {
        authService.appUser$.subscribe(appUser => (this.appUser = appUser));
    }

    ngOnInit() {}

    logout() {
        console.log('logout with google');
        this.authService.oAuthGoogleLogout();
        console.log('logging out of the Applications');
    }
}
