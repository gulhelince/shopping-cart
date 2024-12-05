import { Injectable } from '@angular/core';
import { wishlistUrl } from 'src/config/api';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  // getWishlist() {
  //   return this.http.get(wishlistUrl).pipe(
  //     map((result: any[]) => {
  //       let productIds = []

  //       result.forEach(item => productIds.push(item.id))

  //       return productIds;
  //     })
  //   )
  // }

  private wishlist: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  getWishlist() {
    return this.wishlist.asObservable().pipe(
      map((result: any[]) => {
        let productIds: number[] = [];
        result.forEach(item => productIds.push(item.id));
        return productIds;
      })
    );
  }

  addToWishlist(productId:number){
    return this.http.post(wishlistUrl,{id:productId})
  }

  removeFromWishlist(productId:number){
    return this.http.delete(wishlistUrl + '/' + productId);
  }
}
