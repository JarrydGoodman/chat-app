import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };

  login(): void {
    this.userService.login(this.user)
      .subscribe((res) => {
        if (res !== null) {
          this.router.navigate(['/user-list']);
        } else {
          alert('Invalid credentials');// TODO: better error handling
        }
      });
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
