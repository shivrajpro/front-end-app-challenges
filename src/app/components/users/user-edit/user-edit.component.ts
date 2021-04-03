import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @ViewChild('f') userForm: NgForm;

  userId: string;
  userData: User = new User('', '', '');
  editMode: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // console.log('>>params', params);
      this.userId = params['id'];
      this.editMode = !!params['id'];
      setTimeout(() => {
        this.initForm();
      });
    });
  }

  initForm() {
    let username = '', imageURL = '';

    if (this.editMode) {
      this.userData = this.userService.getUser(this.userId);

      username = this.userData.name;
      imageURL = this.userData.image;
    }
    this.userForm.setValue({
      'username':username,
      'imageURL':imageURL
    })    
    console.log('>>form', this.userForm);
  }

  onCreateNewUser(f: NgForm) {
    // console.log('>>on create', f);
    let userId = Math.floor(1000 + (1100 - 1000)*Math.random()) + '';

    const {username,imageURL} = f.value;
    const newUser = new User(userId, username, imageURL);
    
    this.userService.addUser(newUser);
    this.router.navigate(['../']);

  }

  onUpdateUser() {
    this.userService.updateUser(this.userData.id, this.userData);
    this.router.navigate(['../']);
  }

  onDeleteUser() {
    this.userService.deleteUser(this.userData.id);
    this.router.navigate(['../']);
  }
}
