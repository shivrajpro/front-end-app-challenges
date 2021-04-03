import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  allRestaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService){}

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants();
  
    this.restaurantService.restaurantsChanged.subscribe((restaurants)=>{
      this.allRestaurants = restaurants;
      console.log('>> in cmp', this.allRestaurants);
    })
  }
}
