import { Component, OnInit } from '@angular/core';
import { NoodlesService } from './services/noodles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end-angular';
  
  constructor(private noodlesService: NoodlesService){}

  ngOnInit(): void {
    this.noodlesService.getRestaurants();
  }


}
