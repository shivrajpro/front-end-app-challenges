import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from "lodash";
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BooksApiResponse, BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  genre: string;
  searchQuery: string = '';
  booksList: Book[] = [];
  apiResponse: BooksApiResponse;
  isLoading: boolean = false;
  searchInputFocused: boolean = false;

  constructor(private bookService: BookService, private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.onSearchQueryChange = _.debounce(this.onSearchQueryChange, 1500);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      if (params["genre"]) {
        this.genre = params["genre"];
        this.isLoading = true;

        this.bookService.getBooksByTopic(this.genre);
        this.genre = this.genre[0].toUpperCase() + this.genre.substring(1);
      }

    });

    this.bookService.booksListChanged.subscribe((response: BooksApiResponse) => {
      console.log(">> in cmp", response.results);
      this.isLoading = !response.results;
      this.apiResponse = response;
      this.booksList = this.apiResponse?.results;
    })


  }

  getDisplayTitleOfBook(title: string) {
    if (title.length > 22)
      return title.substr(0, 22) + "...";
    return title;
  }

  getDisplayNameOfAuthor(authorName: string) {
    if (authorName && authorName.length > 20)
      return authorName.substr(0, 20) + "...";
    return authorName;

  }

  onBookCardClick(b) {

    let bookFormat = "";

    for (const key in b.formats) {
      if (key.indexOf("text/html") > -1) {
        bookFormat = b.formats[key];
        break;
      } else if (key.indexOf("application/pdf") > -1) {
        bookFormat = b.formats[key];
        break;
      } else if (key.indexOf("text/plain") > -1) {
        bookFormat = b.formats[key];
        break;
      }
    }

    // bookFormat = ''; uncomment this line to see the error msg to work
    if (bookFormat.length === 0) {
      // toastr
      this.toastr.error("No viewable version available", "ERROR", {
        timeOut: 1500,
        positionClass: 'toast-top-center'
      });

    } else {
      window.open(bookFormat, "_blank", "location=yes,height=720,width=980,scrollbars=yes,status=yes");
    }


  }

  openZipFile(url: string) {
    console.log(">> open zip file", url);
  }

  onLoadMoreClicked(evt) {
    evt.target.innerHTML = 'Loading...';
    console.log(">> load more", this.apiResponse.next);

    this.bookService.getMoreBooks(this.apiResponse.next).subscribe((response: BooksApiResponse) => {
      this.apiResponse = response;
      this.booksList.push(...response.results);
      evt.target.innerHTML = 'Load More...';
    })

  }

  onSearchQueryChange(evt) {
    if (this.searchQuery.length === 0) {

      this.bookService.getBooksByTopic(this.genre);
    } else if (this.searchQuery.length > 0) {
      console.log('>> make an api call', this.searchQuery);
      const queryParams = {
        topic: this.genre,
        searchQuery: this.searchQuery
      }

      this.bookService.getBooksByQuery(queryParams);
    }


  }

}
