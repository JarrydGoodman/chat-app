import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeUser: User;

  register(user: User): Observable<User> {
    return of(user);
  };

  login(user: User): Observable<User> {
    return of(user);
  };

  getUser(username): Observable<User> {
    return of(USERS.find(user => user.username === username));
  };

  getUsers(): Observable<User[]> {
    return of(USERS);// todo integrate with mongodb
  };

  constructor() { }

}
