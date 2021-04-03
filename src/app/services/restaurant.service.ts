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
  noodleImages:any = [];

  restaurantsChanged = new Subject<Restaurant[]>();
  noodleImagesChanged = new Subject<any[]>();

  constructor(private http:HttpClient) { }

  fetchRestaurants(){
    this.http.get<Restaurant[]>(this.restaurantsUrl).subscribe((res)=>{
      // console.log('>> api',res);
      this.setRestaurants(res);
    })
  }

  fetchNoodleImages(){
    this.http.get<any[]>(this.noodleImagesUrl).subscribe((images)=>{
      // console.log('>> images', images);
      this.setNoodleImages(images);
    })
  }

  setNoodleImages(images:any[]){
    this.noodleImages = images;

    this.noodleImagesChanged.next(this.noodleImages.slice());
  }

  getNoodleImages(){
    return this.noodleImages.slice();
  }

  getNoodleImage(){
    let image = this.noodleImages[Math.floor(Math.random() * this.noodleImages.length)];    

    return image;
  }

  getRestaurants(){
    return this.allRestaurants.slice();
  }

  getRestaurant(restaurantId): Restaurant {
    // console.log('>> service id',restaurantId, this.allRestaurants[restaurantId]);
    
    return this.allRestaurants[restaurantId];
  }

  setRestaurants(restaurants: Restaurant[]){
    this.allRestaurants = restaurants;

    this.restaurantsChanged.next(this.allRestaurants.slice());
  }
}
