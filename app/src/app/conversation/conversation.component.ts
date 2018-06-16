import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
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

  chattingWith: User;

  message: Message = {
    body: '',
    sent: null,
    from: this.user,
    to: this.chattingWith
  };

  getChattingWith(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username)
      .subscribe(user => this.chattingWith = user);
  };

  getMessages(): void {
    this.messageService.getMessages(this.chattingWith)
      .subscribe(messages => this.messages = messages);
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getChattingWith();
    this.getMessages();
  }

}
