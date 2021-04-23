import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly baseUrl = "http://skunkworks.ignitesol.com:8000/books";

  booksList: any[];
  booksListChanged = new Subject<Object>();

  constructor(private http: HttpClient) { }

  getBooksByTopic(topic: string) {
    let topicUrl = `${this.baseUrl}?topic=${topic}`;

    console.log(">> url=", topicUrl);

    this.http.get(topicUrl).subscribe((response) => {
      console.log(">> response", response);

      this.booksListChanged.next(response);
    });
  }
}
