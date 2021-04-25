import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { mockData } from "../../configs/mock";
import { environment as env } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

export interface BooksApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Book[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly baseUrl = "http://skunkworks.ignitesol.com:8000/books";

  responseCache = new Map();

  booksList:Book[] = [];
  api_error = new Subject<object>();
  booksListChanged = new BehaviorSubject<object>({});


  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getBooksByTopic(topic: string) {
    let topicUrl = `${this.baseUrl}?topic=${topic.toLowerCase()}`;

    // console.log(">> topicUrl=", topicUrl);
    // console.log(">> cache", this.responseCache);


    if (env.mockMode) {
      this.booksList = mockData.booksApiResponse.results.slice();
      this.booksListChanged.next(mockData.booksApiResponse);
    } else if (this.responseCache.has(topicUrl)) {
      console.log(">> SERVING CACHED RESPONSE");
      this.booksList = this.responseCache.get(topicUrl).results.slice();
      this.booksListChanged.next(this.responseCache.get(topicUrl));
    } else {
      this.http.get<BooksApiResponse>(topicUrl).subscribe((response) => {

        this.booksList = response.results.slice();

        this.booksListChanged.next(response);

        this.responseCache.set(topicUrl, response);
      },
        (error) => {
          this.api_error.next(error);
        }
      );
    }
  }

  getBooksByQuery(q: any) {
    let searchUrl = `${this.baseUrl}?topic=${q.topic}&search=${q.searchQuery}`
    // console.log(">> searchUrl", searchUrl);
    // console.log(">> cache", this.responseCache);

    if (env.mockMode) {
      this.booksList = mockData.booksApiResponse.results.slice();

      this.booksListChanged.next(mockData.booksApiResponse);
    } else if (this.responseCache.has(searchUrl)) {
      console.log(">> SERVING CACHED RESPONSE");
      this.booksList = this.responseCache.get(searchUrl).results.slice();

      this.booksListChanged.next(this.responseCache.get(searchUrl));
    }
    else {
      this.http.get<BooksApiResponse>(searchUrl).subscribe((response) => {
        this.booksList = response.results.slice();

        this.booksListChanged.next(response);

        this.responseCache.set(searchUrl, response);

      },
        (error) => {
          this.api_error.next(error);
        }
      )
    }
  }

  getMoreBooks(url: string) {
    if (env.mockMode) {

      this.booksList.push(...mockData.booksApiResponse.results.slice());

      this.booksListChanged.next(mockData.booksApiResponse);
    } else if (this.responseCache.has(url)) {
      console.log(">> SERVING CACHED RESPONSE");
      this.booksList.push(...this.responseCache.get(url).results.slice());

      this.booksListChanged.next(this.responseCache.get(url));
    }else{
      this.http.get<BooksApiResponse>(url).subscribe((response) => {
        this.booksList.push(...response.results.slice());

        this.booksListChanged.next(response);

        this.responseCache.set(url, response);

      },
        (error) => {
          this.api_error.next(error);
        }
      )

    }
    return this.http.get<any>(url);
  }
}
