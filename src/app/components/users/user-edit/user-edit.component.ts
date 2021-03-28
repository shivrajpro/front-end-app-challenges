import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() user: User;

  @ViewChild('f') userForm: NgForm;

  userId: string;
  userData: User = new User('','','');
  editMode: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      console.log('>>params', params);
      this.userId = params['id'];
      this.editMode = !!params['id'];
      setTimeout(() => {
        this.initForm();
      });
    });
  }

  initForm(){
    let username = '', imageURL = '';

    if(this.editMode){
      this.userData = this.userService.getUser(this.userId);

      if(this.userData)
        console.log('>>userdata', this.userData);
    }
    console.log('>>form', this.userForm);
    // this.userForm.setValue({
    //   'username':'abc',
    //   'imageURL':'url'
    // })

  }

  onCreateNewUser(userForm: NgForm){
    console.log('>>', userForm);
  }

  onUpdateUser(){
    this.userService.updateUser(this.userData.id, this.userData);
    this.router.navigate(['../']);
  }
  
  onDeleteUser(){
    this.userService.deleteUser(this.userData.id);
    this.router.navigate(['../']);
  }
}
