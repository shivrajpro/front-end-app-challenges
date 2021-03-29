import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  allUsers: User[] = [];
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers().reverse();
    this.userService.usersDataChanged.subscribe((newUsersData:User[])=>{
      console.log('>>newusersdata',newUsersData);
      this.allUsers = newUsersData.reverse();
    });    
  }

  onAddUserClick(){
    console.log('>>add user');
    this.router.navigate(['users','new'], {relativeTo:this.route})
  }

}
