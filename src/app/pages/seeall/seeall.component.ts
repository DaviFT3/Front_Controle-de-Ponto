import { Component, OnInit } from '@angular/core';
import { SchedulesService } from 'src/app/services/schedules-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedules } from 'src/app/models/schedules' ;
import { DashboardDates } from 'src/app/models/dashboard-dates';


@Component({
    selector: 'app-seeall',
    templateUrl: './seeall.component.html',
    styleUrls: ['./seeall.component.scss']
  })

export class SeeallComponent implements OnInit {
    dashboardDates : DashboardDates;
    schedules: Schedules[];
    array : any;
    id : string;
    teste : Schedules

    dataa = [{ id: 1, name: 'Mike', city: 'philps', state: 'New York' }, 
        { id: 2, name: 'Steve', city: 'Square', state: 'Chicago' }, 
        { id: 3, name: 'Jhon', city: 'market', state: 'New York' }, 
        { id: 4, name: 'philps', city: 'booket', state: 'Texas' }, 
        { id: 5, name: 'smith', city: 'brookfield', state: 'Florida' }, 
        { id: 6, name: 'Broom', city: 'old street', state: 'Florida' }];

    constructor( private scheduleService: SchedulesService,private route: ActivatedRoute,private router: Router,) { }

    ngOnInit(): void {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      this.id = user.user.id;
      this.dashboardDates = new DashboardDates();
      this.teste = new Schedules();
      this.getAllSchedules(this.id);
    }
    
    getAllSchedules(id: string)  {
        this.scheduleService.getall(id)
          .subscribe(
            data => {
              
              this.teste.dashboardDates = data;
              this.array = data;
              this.schedules = this.array.slice();
              this.dashboardDates = this.teste.dashboardDates;
              console.log(this.dashboardDates)

              console.log(this.teste)
              console.log(this.array);
              console.log(this.schedules)
              console.log(data);
            },
            error => {
              console.log(error);
            });
        
        
      }
}