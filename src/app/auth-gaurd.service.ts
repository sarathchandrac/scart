import { Injectable } from '@angular/core'
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { AuthService } from './core/auth.service'
import { map } from 'rxjs/operators'
import { mapToMapExpression } from '@angular/compiler/src/render3/util'

@Injectable({
    providedIn: 'root',
})
export class AuthGaurd implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.user$.pipe(
            map(user => {
                if (user) {
                    return true
                } else {
                    this.router.navigate(['/login'], {
                        queryParams: { returnUrl: state.url },
                    })
                    return false
                }
            })
        )
    }
}
