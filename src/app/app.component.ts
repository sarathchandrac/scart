import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private userService: UserService,
        public auth: AuthService,
        private router: Router
    ) {
        auth.user$.subscribe(user => {
            if (user) {
                userService.Save(user);
                router.navigateByUrl(localStorage.getItem('returnUrl'));
            }
        });
    }
}
