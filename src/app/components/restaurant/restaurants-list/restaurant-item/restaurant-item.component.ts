import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {
  @Input() restaurant;
  @Input() restaurantId;

  noodleImageURL: string;

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {

    this.restaurantService.noodleImagesChanged.subscribe((res) => {
      let image = this.restaurantService.getNoodleImage();
      this.noodleImageURL = image.Image;
      // console.log('>> item image', image);
    })

  }

  restaurantItemClicked() {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/restaurants/${this.restaurantId}`])
      );
      
    console.log('>>restaurantItemClicked', this.restaurantId, url);
    window.open(url, '_blank');
  }

}
