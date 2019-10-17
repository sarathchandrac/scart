import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from './../core/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        public afAuth: AngularFireAuth,
        private authService: AuthService
    ) {
        this.authService.getCurrentUserState().subscribe(x => console.log(x));
    }

    ngOnInit() {}
    login() {
        console.log('login with google');
        this.authService.oAuthGoogleLogin();
    }
    logout() {
        console.log('logout with google');
        this.authService.oAuthGoogleLogout();
        console.log('logging out of the Applications');
    }
}
