import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private product: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public product$: Observable<any> = this.product.asObservable();

  private count: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public count$: Observable<any> = this.count.asObservable();

  constructor(private http: HttpClient) {}

  setProductToCart(id) {
    this.product.next(id);
  }

  setProductCount(countProd) {
    this.count.next(countProd);
  }

  fetchProductsById(id): Observable<Card[]> {  
    return this.http.get<Card[]>(`/api/cards/${id}`);
  }

  fetchAllProductsById(ids): Observable<Card[]> {
    return this.http.get<Card[]>(`/api/cards/many/${ids}`);
  }
}
