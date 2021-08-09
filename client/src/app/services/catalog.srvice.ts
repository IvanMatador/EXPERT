import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "../interfaces/card.interface";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient) {
  }

  fetchAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>('/api/cards');
  }

}