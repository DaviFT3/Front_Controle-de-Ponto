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
    schedulesMonth: Schedules;
    schedulesMonthAux: Schedules[];
    array : any;
    id : string;
    teste : Schedules
    dataa: any;
    days:any;

    year:number;
    month:number;



    constructor( private scheduleService: SchedulesService,private route: ActivatedRoute,private router: Router) { }

    ngOnInit(): void {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      this.id = user.user.id;
      this.dashboardDates = new DashboardDates();
      this.teste = new Schedules();
      var date =new Date();

      this.getAllSchendulesMothYear(this.id,date.getFullYear(),date.getMonth());

      //this.getAllSchedules(this.id);
     // this.transformArrayInMonth(date.getFullYear(),date.getMonth());
    }
    
    getAllSchendulesMothYear(id:string, year:number,month:number){
      this.scheduleService.getallMonthYear(id,year,month)
      .subscribe(data =>{
        this.schedules = []
        this.schedules = data;
        console.log(this.schedules)
        this.transformArrayInMonth(year,month);

        
      },  error => {
        console.log(error);
      });
    
      return this.days;
    }
    getAllSchedules(id: string)  {
        this.scheduleService.getall(id)
          .subscribe(
            data => {
              
              this.teste.dashboardDates = data;
              this.array = data;
              this.schedules = this.array.slice();
              this.dashboardDates = this.teste.dashboardDates;
         
            },
            error => {
              console.log(error);
            });
        
        
      }

      transformArrayInMonth(year:any,month:any){
        var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

        this.schedules.forEach(element => {
          element.entryDate = new Date(element.entryTime);
          element.dayOfTheWeek =semana[element.entryDate.getDay()]
        });
        this.schedulesMonthAux = [];
        var date =new Date(year,month,1);
        this.days = [];
        let count = 0;
        console.log(date.getMonth());
        console.log(month);
        while (date.getMonth() === parseInt(month)) {
          count++
          this.days.push(new Date(date));
          date.setDate(date.getDate() + 1);
          let index = this.schedules.findIndex((val) => val.entryDate.getDate() == date.getDate());
          if(index != -1){
            this.schedulesMonthAux.push(this.schedules[index]);
          }else{
            let schedule = new Schedules();
            schedule.entryDate = date;
            schedule.lunchTimeDate = date;
            schedule.lunchTimeDate = date;
            schedule.departureTimeDate = date;

            schedule.entryTime = date.toString();
            schedule.lunchTime = date.toString();
            schedule.lunchReturnTime = date.toString();
            schedule.departureTime = date.toString();
            schedule.dayOfTheWeek = semana[date.getDay()];

            this.schedulesMonthAux.push(schedule);
  
          }
        }
        console.log(this.schedulesMonthAux);
      }
}