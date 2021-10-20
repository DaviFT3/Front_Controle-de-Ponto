import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  id:string;

  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user.user.id;
    this.getUser(this.id);
  }

  getUser(id: string){
    this.userService.get(id)
    .subscribe(
      data => {
        
        this.user = data;
        console.log(this.user);
      },
      error => {
        console.log(error);
      });
  }

}