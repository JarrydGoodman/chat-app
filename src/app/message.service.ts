import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { ConversationComponent } from './conversation/conversation.component';
import { Message } from './message';
import { MESSAGES } from './mock-messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  getMessages(User): Observable<Message[]> {
    return of(MESSAGES);
  };

  sendMessage(Message): Observable<number> {
    return of(200);// todo create message in mongo, and return status
  };

  constructor() { }
}
