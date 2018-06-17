import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: User;
  chattingWith: User;

  messages: Message[];
  message: Message = {
    body: '',
    sent: null,
    from: null,
    to: null
  };

  getUser(): void {
    this.user = this.userService.activeUser;
    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      this.message.from = this.user.username;
    }
  };

  prepareConversation(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username)
      .subscribe(user => {
        this.chattingWith = user;
        this.message.to = this.chattingWith.username;
        this.getMessages();
      });
  };

  getMessages(): void {
    this.messageService.getMessages(this.user, this.chattingWith)
      .subscribe(messages => this.messages = messages);
  };

  sendMessage(): void {
    this.message.sent = Date.now();
    this.messageService.sendMessage(this.message)
      .subscribe(message => {
        this.message = new Message;
        this.message.from = this.user.username;
        this.message.to = this.chattingWith.username;

        this.messages.push(message)
      });
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.prepareConversation();
  }

}
