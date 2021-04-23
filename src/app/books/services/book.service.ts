import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Book } from '../models/book.model';
import { mockData } from "../../configs/mock";
import { environment } from 'src/environments/environment';

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

  booksList: any[];
  booksListChanged = new Subject<object>();

  constructor(private http: HttpClient) { }

  getBooksByTopic(topic: string) {
    let topicUrl = `${this.baseUrl}?topic=${topic}`;

    console.log(">> topicUrl=", topicUrl);

    if (environment.mockMode) {
      return mockData.booksApiResponse;
    } else {
      this.http.get<BooksApiResponse>(topicUrl).subscribe((response) => {
        console.log(">> getBooksByTopic", response);

        this.booksListChanged.next(response);
      });
    }

    return null;
  }

  getBooksByQuery(q: any) {
    let searchUrl = `${this.baseUrl}?topic=${q.topic}&search=${q.searchQuery}`
    console.log(">> searchUrl", searchUrl);

    this.http.get<BooksApiResponse>(searchUrl).subscribe((response) => {
      console.log(">> getBooksByQuery", response);

      this.booksListChanged.next(response);

    })
  }

  getMoreBooks(url: string) {
    return this.http.get<any>(url);
  }
}
