import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() user: User;

  @ViewChild('f') userForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onCreateNewUser(userForm: NgForm){
    console.log('>>', userForm);
    
  }
}
