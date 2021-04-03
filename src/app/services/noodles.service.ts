import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoodlesService {

  readonly restaurantsUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json";
  readonly noodleImagesUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json"

  constructor(private http:HttpClient) { }

  getRestaurants(){
    this.http.get(this.restaurantsUrl).subscribe((res)=>{
      console.log('>> res',res);
    })
  }

}
