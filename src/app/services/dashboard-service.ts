import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';
import { HttpParams } from '@angular/common/http';


const baseUrl = 'https://localhost:44320/api/Dashboard';

@Injectable({
    providedIn: 'root'
  })

export class DashboardService {
      constructor(private http: HttpClient) { }
      create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
      }  
      get(id: any): Observable<Dashboard> {
        return this.http.get(`${baseUrl}/UpdateDatesDashboard?idUser=${id}`);
      }
     
}