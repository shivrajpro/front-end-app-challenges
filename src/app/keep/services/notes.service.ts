import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesList:Note[] = [];
  notesListChanged = new Subject<Note[]>();

  constructor() { }

  addEmptyCard(){
    this.notesList.push(new Note());
    this.notesListChanged.next(this.notesList.slice());

    console.log('>> notes',this.notesList);
    
  }

  deleteNote(noteToDelete:Note){
    this.notesList = this.notesList.filter((note)=>{
      return note._id !== noteToDelete._id;
    })

    // console.log('>> delete',this.notesList);
    
    this.notesListChanged.next(this.notesList.slice());
  }
}
