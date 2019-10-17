import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
// import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private afs: AngularFirestore) {
        // this.itemsCollection = afs.collection<Item>('items');
        // this.items = this.itemsCollection.valueChanges();
    }
    // addItem(item: Item) {
    //     this.itemsCollection.add(item);
    // }
    Save(user: firebase.User) {
        const userid = user.uid; //this.afs.doc(`emojis/userJeffD`);
        const url = `users/${userid}`;
        console.log('url', url);
        const userRef = this.afs.doc(url);
        console.log('user ref', userRef);
        userRef.set({
            name: user.displayName,
            isAdmin: true,
            email: user.email
        });
        // this.afs.collection('user')
    }
    get(uid: string) {
        return this.afs.doc<AppUser>(`users/${uid}`).valueChanges();
    }
}
