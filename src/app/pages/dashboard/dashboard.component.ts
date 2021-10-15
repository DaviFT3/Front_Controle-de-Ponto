import { Dashboard } from 'src/app/models/dashboard';
import { DashboardService } from 'src/app/services/dashboard-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardDates } from 'src/app/models/dashboard-dates';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 

  dashboard : Dashboard;
  dashboarddates : DashboardDates;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  id : string;

  constructor( private dashboardService: DashboardService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user.user.id;
    this.dashboard = new Dashboard();
    this.dashboarddates = new DashboardDates();
    this.getDashboard(this.id)

  }
  getToDetails(){
    this.router.navigate(['/seeall']);
 
  }
  
  getDashboard(id: string): void {
    this.dashboardService.get(id)
      .subscribe(
        data => {
          this.dashboard = data;
          this.dashboard.balance = this.dashboard.balance;
          this.dashboard.workload = this.dashboard.workload;
          this.dashboarddates = this.dashboard.recentDates;
          console.log(this.dashboard);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
