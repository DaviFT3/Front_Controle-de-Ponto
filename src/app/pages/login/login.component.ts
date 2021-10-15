import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  user : User;

  constructor(private authenticationService:AuthenticationService,private route: ActivatedRoute,
    private router: Router) {
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);


    }
  }

  ngOnInit() {

    this.user = new User();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  onSubmit() {
    console.log("foi");
    console.log(this.user);
    

    
    this.authenticationService.login(this.user.username, this.user.password)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}

  

}
