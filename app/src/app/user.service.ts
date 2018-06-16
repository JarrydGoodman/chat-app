import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './user';
import { USERS } from './mock-users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.apiUrl + '/api/users';

  activeUser: User;

  setActiveUser(user: User): void {
    this.activeUser = user;
  };

  register(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/register', user, httpOptions)
      .pipe(
        tap(user => this.activeUser = user),
        catchError(this.handleError<User>('registerUser', null))
      );
  };
  
  login(user: User): Observable<User> {
    return of(user);
  };
  
  getUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/${username}`;

    return of(USERS.find(user => user.username === username));
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', null))
      );
  };

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(`${operation} failed: ${error.message}`); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
