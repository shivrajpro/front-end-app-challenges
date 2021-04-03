import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end-angular';
  
  constructor(private noodlesService: RestaurantService){}

  ngOnInit(): void {
  }


}
