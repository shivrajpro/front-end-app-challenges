import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router){

  }

  onGenreCardClick(evt){
    let dataset = evt.target.closest("div").dataset;

    console.log(dataset.genre);

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/books/${dataset.genre}`])
      );
      
    console.log('>> url', url);
    window.open(url, '_blank');    
  }
}
