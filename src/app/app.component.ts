import { Component } from '@angular/core';
// import { MongoDB } from 'mongodb';

// const client = MongoDB.MongoClient;
// const url = 'mongodb+srv://chat-man:6VK58SsGR6YYThvw@chatcluster-w8rlx.mongodb.net/test?retryWrites=true';
// const dbName = 'chat-app';

// client.connect(url, function(err, client) {
//   if (err === null) {
//     return;
//   }

//   console.log('connect to mongodb');

//   const db = client.db(dbName);

//   client.close();
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat App';
}
