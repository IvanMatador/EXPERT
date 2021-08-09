import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discount: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public discount$: Observable<any> = this.discount.asObservable();

  setDiscount(discountSize) {
    this.discount.next(discountSize);
  }
}