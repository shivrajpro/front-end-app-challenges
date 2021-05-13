import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesList:Note[] = [];
  notesChanged = new Subject<Note[]>();

  constructor() { }

  addEmptyCard(){
    this.notesList.push(new Note());
    this.notesChanged.next(this.notesList.slice());

    console.log('>> notes',this.notesList);
    
  }
}
