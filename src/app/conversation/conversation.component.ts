import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { User } from '../user';
import { Message } from '../message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  user: User = {
    username: 'johndoe',
    password: 'password'
  };

  messages: Message[];

  @Input() chattingWith: User;

  message: Message = {
    body: '',
    sent: null,
    from: this.user,
    to: this.chattingWith
  };

  getMessages(): void {
    this.messageService.getMessages(this.chattingWith)
      .subscribe(messages => this.messages = messages);
  };

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

}
