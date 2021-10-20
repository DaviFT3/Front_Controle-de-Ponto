import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayOffService } from 'src/app/services/dayoff.service';
import { DayOff } from 'src/app/models/dayOff';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  datesMonth:any;
  days:any;
  id : string;
  companyId : string;
  dayoff : DayOff;
  company : Company;
  user : User;
  dateSelect : Date;

  constructor( private dayoffservice: DayOffService,private route: ActivatedRoute,private router: Router,private datepipe: DatePipe) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user.user.id;
    this.companyId = user.user.companyId;
    var date = new Date(2021,10,1);
    this.days = [];
    while (date.getMonth() === 10) {
      this.days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    this.sundayFriday()
    return this.days;
  }

  returnFridayMonth(){
    this.days.forEach(element => {
      var day = element.getDay();
        var day2 = element.getDate();
        if(day == 5 && day2 <= 7){
          this.datesMonth.push(element);
        }
    });
    console.log(this.datesMonth);
  }

  sundayFriday(){
    this.datesMonth = [];
    var days = new Date( 2021,10,0 ).getDate();
    var sundays = [ 6 - (new Date( 10 +'/01/'+ 2021 ).getDay()) ];
    for ( var i = sundays[0] + 7; i < days; i += 7 ) {
      sundays.push( i );
      this.datesMonth.push(new Date(2021,10,i))
    }
    return sundays;
  }
  createHappyFriday( id : string, ){
    var date  = this.datepipe.transform(this.dateSelect,'yyyy-MM-dd')
    this.dayoffservice.create(date, this.companyId, this.id)
    .subscribe(
      data => {
        this.dayoff = data;
        this.dayoff.collaborator = this.dayoff.collaborator;
        this.dayoff.company = this.company;
        this.dayoff.idUser = this.dayoff.idUser;
        this.dayoff.companyid = this.dayoff.companyid
        console.log(this.dayoff)
        
      }
    )
    

  }


}
