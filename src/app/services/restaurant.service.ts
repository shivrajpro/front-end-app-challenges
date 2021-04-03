import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Restaurant } from "../models/restaurant.model";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  readonly restaurantsUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json";
  readonly noodleImagesUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json"

  allRestaurants: Restaurant[] = [];
  restaurantsChanged = new Subject<Restaurant[]>();
  

  constructor(private http:HttpClient) { }

  fetchRestaurants(){
    this.http.get<Restaurant[]>(this.restaurantsUrl).subscribe((res)=>{
      console.log('>> api',res);
      this.setRestaurants(res);
    })
  }

  getRestaurants(){
    return this.allRestaurants.slice();
  }

  setRestaurants(restaurants: Restaurant[]){
    this.allRestaurants = restaurants;

    this.restaurantsChanged.next(this.allRestaurants.slice());
  }
}
