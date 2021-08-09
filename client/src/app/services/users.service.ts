import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from './../interfaces/users.inteface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  fetchByParams(paramsObj): Observable<User[]> {
    const innerObject = paramsObj.map(item => item = {...item})
    const objFromArray = {...innerObject};
    let params = {};   
    this.buildHttpParams(params, objFromArray, "");
    return this.http.get<User[]>(`/api/filters/`, { params });
  }

  removeItem(id: string): Observable<User[]> {
    return this.http.delete<User[]>(`/api/users/${id}`);
  }

  private buildHttpParams(params: any, data: any, currentPath: string) {
    Object.keys(data).forEach(key => {
        if (data[key] instanceof Object) {
            this.buildHttpParams(params, data[key], `${currentPath}${key}.`);
        } else {
            params[`${currentPath}${key}`] = data[key];
        }
    });
  }

}