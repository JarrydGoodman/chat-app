import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Message } from './message';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesUrl = environment.apiUrl + '/api/messages';

  messages: Message[] = [];

  getMessages(to: User, from: User): Observable<Message[]> {
    const params = this.createToFromUsersQuery(to, from);
    const url = this.messagesUrl + '?' + this.serialize(params);
    return this.http.get<Message[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Message[]>('getMessages', null))
      );
  };

  searchMessages(to: User, from: User, search: string): Observable<Message[]> {
    const query = {
      'body': { '$regex': search, '$options': 'i' }
    };
    const params = this.createToFromUsersQuery(to, from, query);
    const url = this.messagesUrl + '?' + this.serialize(params);
    return this.http.get<Message[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Message[]>('getMessages', null))
      );
  };

  sendMessage(Message): Observable<Message> {
    return this.http.post<Message>(this.messagesUrl, Message, httpOptions)
      .pipe(
        catchError(this.handleError<Message>('sendMessage', null))
      );
  };

  constructor(private http: HttpClient) { }

  private createToFromUsersQuery(user1: User, user2: User, query?: object): Object {
    return {
      '$and': [
        {
          '$or': [
            { to: user1.username },
            { to: user2.username }
          ]
        },
        {
          '$or': [
            { from: user1.username },
            { from: user2.username }
          ]
        },
        query ? query : {}// TODO: cleaner query method logic so we don't get an empty object here
      ]
    };
  };

  private serialize(obj, prefix?) {
    let str = [];
    let p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + '[' + p + ']' : p;
        let v = obj[p];
        str.push((v !== null && typeof v === 'object') ?
          this.serialize(v, k) :
          encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    }
    return str.join('&');
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`${operation} failed: ${error.message}`); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
