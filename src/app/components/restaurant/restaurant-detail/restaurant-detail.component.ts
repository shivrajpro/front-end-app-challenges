import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant = null;
  restaurantId: number = null;
  noodleImageURL: string;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //need to call a separate REST API here
    this.restaurantService.fetchRestaurants();

    this.restaurantService.restaurantsChanged.subscribe((restaurants) => {
      this.route.params.subscribe((params: Params) => {
        this.restaurantId = +params['id'];
        console.log('>>params', this.restaurantId);

        if (this.restaurantId != null)
          this.restaurant = this.restaurantService.getRestaurant(this.restaurantId);

        console.log('>> detail', this.restaurant);

      })
    });

    this.restaurantService.fetchNoodleImages();

    this.restaurantService.noodleImagesChanged.subscribe((res) => {
      let image = this.restaurantService.getNoodleImage();
      this.noodleImageURL = image.Image;
      console.log('>> detail image', image);
    })

  }

}
