import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SchedulesService } from 'src/app/services/schedules-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedules } from 'src/app/models/schedules' ;

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  schedules: Schedules
  dateToday:Date;
  public copy: string;
  clock=""
  clockHandle;
  id : string;
  constructor( private scheduleService: SchedulesService,
    private route: ActivatedRoute,
    private router: Router,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.clockHandle = setInterval(()=>{
      this.clock = new Date().toLocaleString();
    },1000);
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user.user.id;
    this.dateToday = new Date();
    this.schedules = new Schedules();
    this.getSchedules(this.id)
  }

  getSchedules(id: string): void {
    this.scheduleService.get(id)
      .subscribe(
        data => {
          this.schedules = data;
          this.schedules.entryDate = new Date(this.schedules.entryTime);
          this.schedules.departureTimeDate = new Date(this.schedules.departureTime);
          this.schedules.lunchTimeDate = new Date(this.schedules.lunchTime);
          this.schedules.returnLunchTimeDate = new Date(this.schedules.lunchReturnTime);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  beatSchedules(id: string): void {
    if (this.schedules.departureTime == '0001-01-01T00:00:00'){
      this.scheduleService.beattime(id)
    .subscribe(
      data => {
        this.schedules = data;
        this.schedules.entryDate = new Date(this.schedules.entryTime);
        this.schedules.departureTimeDate = new Date(this.schedules.departureTime);
        this.schedules.lunchTimeDate = new Date(this.schedules.lunchTime);
        this.schedules.returnLunchTimeDate = new Date(this.schedules.lunchReturnTime);
        this.toastr.success('Registro de Ponto', 'Com sucesso');
        console.log(data);
      },
      error => {
        console.log(error);
      });
    }
    else {
      this.toastr.error('Não é possivel bater ponto')
    }
  }
}
