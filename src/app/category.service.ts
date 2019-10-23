import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Category } from './models/category'
import { map, tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private afs: AngularFirestore) {
        // this.itemsCollection = afs.collection<Item>('items');
        // this.items = this.itemsCollection.valueChanges();
    }
    // /categories/dairy
    get(categoryName: string) {
        return this.afs
            .doc<Category>(`categories/${categoryName}`)
            .snapshotChanges()
            .pipe(tap(console.log))
    }
    getCategories() {
        // return this.afs.doc<Category>(`categories`).valueChanges()
        /*
        , {
                query: {
                    orderByChild: 'name',
                },
            }
            this.shirts = this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
        */
        return this.afs
            .collection<Category>(`categories`, ref => ref.orderBy('name'))
            .snapshotChanges()
            .pipe(
                map(resp =>
                    resp.map(cat => {
                        const data = cat.payload.doc.data()
                        const id = cat.payload.doc.id
                        return { id, ...data }
                    })
                ),
                tap(console.log)
            )
    }
}
