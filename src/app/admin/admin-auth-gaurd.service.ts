import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { CanActivate } from '@angular/router';
import { AuthService } from './../core/auth.service';
import { UserService } from './../user.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from './../models/app-user';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGaurd implements CanActivate {
    constructor(private auth: AuthService, private userService: UserService) {}
    canActivate(): Observable<boolean> {
        return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
        // return this.auth.user$
        //     .switchMap(user => this.userService.get(user.uid))
        //     .map((appUser: any) => appUser.isAdmin);
        // return this.auth.user$.pipe(
        //     switchMap<firebase.User, AngularFirestoreDocument<AppUser>>(
        //         user => {
        //             return this.userService.get(user.uid);
        //         }
        //     ),
        //     map<AngularFirestoreDocument<AppUser>, boolean>(
        //         appUser => true //appUser.isAdmin
        //     )
        // );
    }
}
