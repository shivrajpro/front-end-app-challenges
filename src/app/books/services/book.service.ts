import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { mockData } from "../../configs/mock";
import { environment as env } from 'src/environments/environment';

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

  booksList: any[];
  booksListChanged = new BehaviorSubject<object>({});

  constructor(private http: HttpClient) { }

  getBooksByTopic(topic: string) {
    let topicUrl = `${this.baseUrl}?topic=${topic.toLowerCase()}`;

    // console.log(">> topicUrl=", topicUrl);
    // console.log(">> cache", this.responseCache);


    if (env.mockMode) {
      this.booksListChanged.next(mockData.booksApiResponse);
    } else if (this.responseCache.has(topicUrl)) {
      console.log(">> SERVING CACHED RESPONSE");
      this.booksListChanged.next(this.responseCache.get(topicUrl));
    } else {
      this.http.get<BooksApiResponse>(topicUrl).subscribe((response) => {
        this.booksListChanged.next(response);

        this.responseCache.set(topicUrl, response);
      });
    }
  }

  getBooksByQuery(q: any) {
    let searchUrl = `${this.baseUrl}?topic=${q.topic}&search=${q.searchQuery}`
    // console.log(">> searchUrl", searchUrl);
    console.log(">> cache", this.responseCache);

    if (env.mockMode) {
      this.booksListChanged.next(mockData.booksApiResponse);
    } else if (this.responseCache.has(searchUrl)) {
      console.log(">> SERVING CACHED RESPONSE");
      this.booksListChanged.next(this.responseCache.get(searchUrl));
    }
    else {
      this.http.get<BooksApiResponse>(searchUrl).subscribe((response) => {
        this.booksListChanged.next(response);

        this.responseCache.set(searchUrl, response);

      })
    }
  }

  getMoreBooks(url: string) {
    if (env.mockMode) {

      var booksObsservable = new Observable((obs) => {
        obs.next(mockData.booksApiResponse);
      });

      return booksObsservable;
    }
    return this.http.get<any>(url);
  }
}
