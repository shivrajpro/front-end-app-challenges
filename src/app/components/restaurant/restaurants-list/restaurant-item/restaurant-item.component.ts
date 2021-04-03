import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {
  @Input() restaurant;
  @Input() restaurantId;

  constructor() { }

  ngOnInit(): void {
  }

}
