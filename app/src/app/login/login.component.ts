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
    if (!this.user.username || !this.user.password) {
      alert('Please enter your username & password');
      return;
    }
    
    this.userService.login(this.user)
      .subscribe(user => {
        if (!user) {
          alert('Invalid credentials');
        } else {
          this.router.navigate(['/user-list']);
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
