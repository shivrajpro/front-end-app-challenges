import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {
  @Input() restaurant;
  @Input() restaurantId;

  noodleImageURL : string;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    this.restaurantService.noodleImagesChanged.subscribe((res)=>{
      let image = this.restaurantService.getNoodleImage();
      this.noodleImageURL = image.Image;
      // console.log('>> item image', image);
    })
    
  }

}
