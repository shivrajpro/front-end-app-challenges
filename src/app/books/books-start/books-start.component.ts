import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-start',
  templateUrl: './books-start.component.html',
  styleUrls: ['./books-start.component.scss']
})
export class BooksStartComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  onGenreCardClick(evt) {
    let dataset = evt.target.closest("div").dataset;

    // console.log(dataset.genre);

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/books/${dataset.genre}`])
    );

    console.log('>> url', url);
    window.open(url, '_blank');
  }
}
