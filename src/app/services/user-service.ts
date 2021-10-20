import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';
import { User } from '../models/user';
import { HttpParams } from '@angular/common/http';


const baseUrl = 'https://localhost:44320/api/Collaborator';
@Injectable({
    providedIn: 'root'
  })

  export class UserService {
    constructor(private http: HttpClient) { }
    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data);
    }  
    get(id: any): Observable<User> {
        let url = `${baseUrl}/${id}`;
      return this.http.get(url);
    }
   
}
