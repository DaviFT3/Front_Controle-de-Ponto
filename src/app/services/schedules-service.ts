import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedules } from '../models/schedules';
import { HttpParams } from '@angular/common/http';

const baseUrl = 'https://localhost:44320/api/Schedule';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private http: HttpClient) { }

  get(id: any): Observable<Schedules> {
    return this.http.get(`${baseUrl}/CollaboratorSchedulesByToday/${id}`);
  }
  getall(id:any): Observable<Schedules>{
    return this.http.get(`${baseUrl}/CollaboratorSchedules?id=${id}`)
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  getallMonthYear(id:string, year:number,month:number): Observable<any>{
    return this.http.get(`${baseUrl}/CollaboratorSchedulesByMonthAndYear?id=${id}&year=${year}&month=${month}`)
  }
  
  beattime(id: any): Observable<Schedules> {
    const params = new HttpParams()
    .set('id', id.toString());
    var url = `${baseUrl}/CheckSchedules`

   return this.http.get(url, {params})
  }

}
