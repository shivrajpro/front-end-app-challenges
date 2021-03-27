import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserComponent } from './components/users/user/user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'users',
    pathMatch:'full'
  },
  {
    path:'users',
    component: UsersComponent,
    children:[
      {
        path:'new',
        component: UserEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
