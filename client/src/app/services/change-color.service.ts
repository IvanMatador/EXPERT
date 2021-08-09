import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeColorService {
  private color: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public color$: Observable<any> = this.color.asObservable();

  updateColorFn(updatedColor) {
    this.color.next(updatedColor);
  }
}