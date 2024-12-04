import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private subject = new Subject<Product>();

  sendMsg(product: Product) {
    this.subject.next(product);
  }

  getMsg(): Observable<Product> {
    return this.subject.asObservable();
  }
}
