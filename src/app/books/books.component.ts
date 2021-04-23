import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService]
})
export class BooksComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
}
