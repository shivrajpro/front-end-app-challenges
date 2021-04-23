import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksStartComponent } from './books/books-start/books-start.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksListComponent,
    BooksStartComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
