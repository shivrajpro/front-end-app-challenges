import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoodlesDetailComponent } from './components/noodles/noodles-detail/noodles-detail.component';
import { NoodlesComponent } from './components/noodles/noodles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  {
    path: 'restaurants',
    component: NoodlesComponent,
    children:[
      {
        path:':id',
        component: NoodlesDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
