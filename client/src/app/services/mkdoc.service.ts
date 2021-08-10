import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MkDocService {
  /* private product: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public product$: Observable<any> = this.product.asObservable();

  private count: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public count$: Observable<any> = this.count.asObservable(); */

  constructor(private http: HttpClient) {}

  mkDocxFile(dataArray): Observable<any> {
    return this.http.post<any>(`/api/make-doc`, dataArray);
  }
}
