import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksStartComponent } from './books/books-start/books-start.component';
import { BooksComponent } from './books/books.component';
import { NotesStartComponent } from './keep/notes-start/notes-start.component';

const routes: Routes = [
  {
    path:'',
    component: NotesStartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
