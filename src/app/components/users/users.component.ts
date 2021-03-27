import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers:[UserService]
})
export class UsersComponent implements OnInit {

  allUsers: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
    console.log('>>', this.allUsers);
  }

}
