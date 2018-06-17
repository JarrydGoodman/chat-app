import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: User;
  users: User[];

  getUser(): void {
    this.user = this.userService.activeUser;
    if (!this.user) {
      this.router.navigate(['login']);
    }
  };

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users.filter((user) => {
        return user.username != this.user.username;
      }));
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.getUsers();
  }

}
