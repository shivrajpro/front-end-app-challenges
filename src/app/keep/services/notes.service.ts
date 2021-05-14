import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  readonly notesUrl = 'https://ng-complete-guide-c1ec4.firebaseio.com/notes.json';
  notesList:Note[] = [];
  notesListChanged = new Subject<Note[]>();

  constructor(private http:HttpClient) { 
  }

  saveNotes(){
    const allNotes:Note[] = this.notesList.slice();

    if(allNotes.length === 0)
      return;

    this.http.put(this.notesUrl, allNotes)
    .subscribe((response)=>{
      console.log('>> response',response);
      
    })
    
  }
  addEmptyNote(){
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

  pinNote(noteItem:Note){
    const index = this.notesList.findIndex((note)=>note._id === noteItem._id);
    const theNote = this.notesList.splice(index,1)[0];

    theNote.isPinned = !theNote.isPinned;
    this.notesList.unshift(theNote);
  
    this.notesListChanged.next(this.notesList.slice());
  }
}
