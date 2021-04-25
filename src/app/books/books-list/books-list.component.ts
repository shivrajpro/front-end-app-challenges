import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import $ from "jquery";
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { mockData } from "../../configs/mock";
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { BooksApiResponse, BookService } from '../services/book.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {

  genre: string = '';
  searchQuery: string = '';
  booksList: Book[] = [];
  apiResponse: BooksApiResponse;
  isLoading: boolean = false;
  searchInputFocused: boolean = false;
  routeParamsSub: Subscription;
  booksListChangedSub: Subscription;
  getMoreBooksSub: Subscription;
  apiErrorSub:Subscription;
  windowScrollListener;

  constructor(private bookService: BookService, private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.onSearchQueryChange = _.debounce(this.onSearchQueryChange, 1000);

    this.bookListScroll = _.debounce(this.bookListScroll, 500);

    this.windowScrollListener = () => {
      this.bookListScroll();
    }

    window.addEventListener('scroll', this.windowScrollListener);
  }

  ngOnInit(): void {

    this.routeParamsSub = this.route.params.subscribe((params: Params) => {

      if (params["genre"]) {
        this.genre = params["genre"];
        this.isLoading = true;

        this.bookService.getBooksByTopic(this.genre);
        this.genre = this.genre[0].toUpperCase() + this.genre.substring(1);
      }

    });

    this.booksListChangedSub = this.bookService.booksListChanged.subscribe((response: BooksApiResponse) => {
      // console.log(">> in cmp", response.results);
      this.isLoading = !response.results;

      if(response.results){
        this.apiResponse = response;
        this.booksList = this.bookService.booksList.slice();
      }
    })

    this.apiErrorSub = this.bookService.api_error.subscribe((e) => {
      // console.log(">> e=", e);
      this.isLoading = false;
      this.toastr.error("An unknown error occured!", "ERROR", {
        timeOut: 1500,
        positionClass: 'toast-top-center'
      });
    })

  }

  bookListScroll() {
    // console.log('>> scroll', this.booksList);

    let pixelsFromWindowBottomToBottom = 0 + $(document).height() - $(window).scrollTop() - $(window).height();

    if (pixelsFromWindowBottomToBottom < 100 && this.apiResponse.next)
      this.loadMoreBooks();
  }

  getDisplayTitleOfBook(title: string) {
    if (title.length > 22)
      return title.substr(0, 22) + "...";
    return title;
  }

  getDisplayNameOfAuthor(authors: Author[]) {
    let dispName = "";

    if (authors.length > 0) {
      let authorNames = _.map(authors, 'name');
      dispName = authorNames.join();
      if (dispName.length > 22)
        dispName = dispName.substr(0, 20) + "...";
    }
    return dispName;
  }

  onBookCardClick(evt) {
    let bookFormat = "";

    let dataset = evt.target.closest("li").dataset;
    if (dataset && dataset.bookid) {
      let clickedBook = _.find(this.booksList, ['id', +dataset.bookid])

      // console.log(">> clickedBook", dataset.bookid, clickedBook);
      for (const key in clickedBook.formats) {
        if (key.indexOf("text/html") > -1) {
          bookFormat = clickedBook.formats[key];
          break;
        } else if (key.indexOf("application/pdf") > -1) {
          bookFormat = clickedBook.formats[key];
          break;
        } else if (key.indexOf("text/plain") > -1) {
          bookFormat = clickedBook.formats[key];
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

  }

  openZipFile(url: string) {
    // console.log(">> open zip file", url);
  }

  loadMoreBooks() {
    // console.log(">> load more", this.apiResponse.next);
    $('#loadMoreSpinner').html(`<div class="spinner-border text-primary"></div>`);

    this.getMoreBooksSub = this.bookService.getMoreBooks(this.apiResponse.next).subscribe((response: BooksApiResponse) => {
      this.apiResponse = response;

      this.booksList.push(...response.results.slice());

      // $('#loadMoreSpinner').html('');
    },
      (error) => {
        this.isLoading = false;
        this.toastr.error("An unknown error occured!", "ERROR", {
          timeOut: 1500,
          positionClass: 'toast-top-center'
        });

      }
    )

  }

  onSearchQueryChange(evt) {
    if (this.searchQuery.length === 0) {
      // console.log(">> evt", evt.target.closest("button"));
      if (evt.target && evt.target.closest("button") && evt.target.closest("button").id === "searchBtn") {
        this.isLoading = false;

        this.toastr.info("Please type a name of book or author", "Information", {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        })

      }

      this.bookService.getBooksByTopic(this.genre);
    } else if (this.searchQuery.length > 0) {
      // console.log('>> make an api call', this.searchQuery);
      const queryParams = {
        topic: this.genre.toLowerCase(),
        searchQuery: this.searchQuery.toLowerCase()
      }

      this.bookService.getBooksByQuery(queryParams);
    }


  }

  getImageUrl(i) {
    let randomImg = mockData.bookCovers[i % mockData.bookCovers.length]

    return randomImg.url;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.windowScrollListener);
    this.routeParamsSub.unsubscribe();
    this.booksListChangedSub.unsubscribe();
    this.getMoreBooksSub.unsubscribe();
    this.apiErrorSub.unsubscribe();
  }

}
