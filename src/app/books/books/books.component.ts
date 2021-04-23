import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private router: Router){

  }

  ngOnInit(): void {
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
