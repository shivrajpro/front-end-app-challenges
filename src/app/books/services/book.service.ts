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

    console.log(">> topicUrl=", topicUrl);

    this.http.get(topicUrl).subscribe((response) => {
      console.log(">> getBooksByTopic", response);

      this.booksListChanged.next(response);
    });
  }

  getBooksByQuery(q: any){
    let searchUrl = `${this.baseUrl}?topic=${q.topic}&search=${q.searchQuery}`
    console.log(">> searchUrl", searchUrl);
    
    this.http.get(searchUrl).subscribe((response)=>{
      console.log(">> getBooksByQuery", response);

      this.booksListChanged.next(response);

    })
  }
}
