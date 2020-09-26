import { Component, OnInit } from '@angular/core';
import {UserManagerClient} from './protos/ManagersServiceClientPb';
import {CreateUserRequest} from './protos/managers_pb.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';



  ngOnInit(): void {
    let client = new UserManagerClient('http://localhost:8080');
    let req = new CreateUserRequest();
    req.setUsername('asdfsadfsad');

    client.createUser(req, {}, (err, res) => {
      console.log(err);
      console.log(res);
    });
  }
}
