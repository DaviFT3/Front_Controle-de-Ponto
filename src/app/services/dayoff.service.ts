import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DayOff } from '../models/dayOff';
import { formatDate } from "@angular/common";

const baseUrl = 'https://localhost:44320/api/DayOff';

@Injectable({
    providedIn: 'root'
  })
export class DayOffService {
    constructor(private http: HttpClient) { }

    create(date: any, companyId : string, idUser: string): Observable<DayOff> {
      let body = {
        collaboratorId: idUser,
        companyId: companyId,
        dayOffDate :  date,
        active : true
      };
      return this.http.post<any>(baseUrl + "/create", body);
    }

    getall(): Observable<DayOff> {
      return this.http.get(`${baseUrl}/GetAllByUserId`);
    }

}