import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };

  register(): void {
    if (!this.user.username || !this.user.password) {
      alert('Please choose a username & password');
      return;
    }
    
    this.userService.register(this.user)
      .subscribe(user => {
        if (!user) {
          alert('Username taken')
        } else {
          this.router.navigate(['/user-list'])
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
