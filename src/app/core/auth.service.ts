import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from './../models/app-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authState: any;
    user$: Observable<firebase.User>;
    constructor(
        private userService: UserService,
        public afAuth: AngularFireAuth,
        private route: ActivatedRoute
    ) {
        this.user$ = afAuth.authState;
    }
    public doGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth.auth.signInWithPopup(provider).then(res => {
                resolve(res);
            });
        });
    }
    public oAuthGoogleLogin() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.auth
            .signInWithPopup(new auth.GoogleAuthProvider())
            .then(res => {
                this.authState = this.afAuth.authState;
            });
    }
    public oAuthGoogleLogout() {
        this.afAuth.auth
            .signOut()
            .then(x => (this.authState = this.afAuth.authState));
    }
    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }
    // Returns current user
    public getCurrentUserState(): any {
        return this.afAuth.authState;
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get appUser$(): Observable<AppUser> {
        return this.user$.pipe(
            switchMap((user: firebase.User) => {
                if (user) {
                    return this.userService.get(user.uid);
                } else {
                    return of(null) as Observable<AppUser>;
                }
            })
        );
    }
}
