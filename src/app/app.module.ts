import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

// need this for toastr to work
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksStartComponent } from './books/books-start/books-start.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CardsListComponent } from './keep/cards-list/cards-list.component';
import { CardItemComponent } from './keep/cards-list/card-item/card-item.component';
import { NotesStartComponent } from './keep/notes-start/notes-start.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksListComponent,
    BooksStartComponent,
    LoadingSpinnerComponent,
    CardsListComponent,
    CardItemComponent,
    NotesStartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
