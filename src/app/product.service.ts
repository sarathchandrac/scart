import { Injectable } from '@angular/core'
import { Product } from './models/product'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private afs: AngularFirestore) {}

    getAll(): Observable<Product[]> {
        return this.afs
            .collection<Product>(`products`)
            .snapshotChanges()
            .pipe(
                map(resp =>
                    resp.map(prod => {
                        const data = prod.payload.doc.data()
                        const id = prod.payload.doc.id
                        return { id, ...data }
                    })
                ),
                tap(console.log)
            )
    }

    get(productId: string): Observable<Product> {
        return this.afs.doc<Product>(`products/${productId}`).valueChanges()
    }
    create(product: Product) {
        return this.afs.collection<Product>(`products`).add(product)
    }

    update(productId, product) {
        return this.afs.doc<Product>(`products/${productId}`).update(product)
    }
    delete(productId) {
        return this.afs.doc<Product>(`products/${productId}`).delete()
    }
}
