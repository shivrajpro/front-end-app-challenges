import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  allRestaurants: Restaurant[] = [];

  searchBrandName:string = '';
  
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants();
    this.restaurantService.fetchNoodleImages();
    
    this.restaurantService.restaurantsChanged.subscribe((restaurants) => {
      this.allRestaurants = restaurants;
      console.log('>> in cmp', this.allRestaurants);
    })
  }

  sortByStars(){

    this.allRestaurants = _.orderBy(this.allRestaurants, ['Stars'],['desc']);
    // this.allRestaurants.sort(function (a,b) {
    //   let aStar = +a.Stars;
    //   let bStar = +b.Stars;
      
    //   return b.Stars - a.Stars;
    // })

    // console.log('>> all', this.allRestaurants);
    
  }
}
