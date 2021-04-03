import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantDetailComponent } from './components/noodles/restaurant-detail/restaurant-detail.component';
import { RestaurantComponent } from './components/noodles/restaurant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  {
    path: 'restaurants',
    component: RestaurantComponent,
    children:[
      {
        path:':id',
        component: RestaurantDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
