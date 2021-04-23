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

  booksList: any[];
  booksListChanged = new BehaviorSubject<object>({});

  constructor(private http: HttpClient) { }

  getBooksByTopic(topic: string) {
    let topicUrl = `${this.baseUrl}?topic=${topic}`;

    console.log(">> topicUrl=", topicUrl);

    if (env.mockMode) {
      this.booksListChanged.next(mockData.booksApiResponse);
    } else {
      this.http.get<BooksApiResponse>(topicUrl).subscribe((response) => {
        console.log(">> getBooksByTopic", response);

        this.booksListChanged.next(response);
      });
    }
  }

  getBooksByQuery(q: any) {
    let searchUrl = `${this.baseUrl}?topic=${q.topic}&search=${q.searchQuery}`
    console.log(">> searchUrl", searchUrl);

    if(env.mockMode){
      this.booksListChanged.next(mockData.booksApiResponse);
    }else{
      this.http.get<BooksApiResponse>(searchUrl).subscribe((response) => {
        console.log(">> getBooksByQuery", response);
  
        this.booksListChanged.next(response);
  
      })
    }
  }

  getMoreBooks(url: string) {
    // var moreBooksObs = new Observable();
    if(env.mockMode){

      const booksObsservable = new Observable((obs)=>{
        obs.next(mockData.booksApiResponse);
      });
      return booksObsservable;
      // this.booksListChanged.next(mockData.booksApiResponse);
    }
    return this.http.get<any>(url);
  }
}
