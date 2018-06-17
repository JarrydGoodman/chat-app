import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './user';
import { Md5 } from 'ts-md5/dist/md5';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.apiUrl + '/api/users';

  activeUser: User;// TODO: user sessions

  setActiveUser(user: User): void {
    this.activeUser = user;
  };

  passwordHash(password: string): string {
    return <string>Md5.hashStr(password);// TODO: needs some salt
  };

  register(user: User): Observable<User> {
    // TODO: clone user before hashing password
    // as two-way data binding is causing the password field to change as well
    user.password = this.passwordHash(user.password);
    return this.http.post<User>(this.usersUrl + '/register', user, httpOptions)
      .pipe(
        tap(user => this.setActiveUser(user)),
        catchError(this.handleError<User>('registerUser', null))
      );
  };
  
  login(user: User): Observable<User> {
    // TODO: clone user before hashing password
    // as two-way data binding is causing the password field to change as well
    user.password = this.passwordHash(user.password);
    return this.http.post<User>(this.usersUrl + '/login', user, httpOptions)
      .pipe(
        tap(user => this.setActiveUser(user)),
        catchError(this.handleError<User>('loginUser', null))
      );
  };
  
  getUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/${username}`;
    return this.http.get<User>(url)
      .pipe(
        catchError(this.handleError<User>('getUser', null))
      );
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
