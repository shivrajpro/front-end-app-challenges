import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  readonly getNotesUrl = 'https://ng-complete-guide-c1ec4.firebaseio.com/notes.json';
  notesList:Note[] = [];
  notesListChanged = new Subject<Note[]>();

  constructor(private http:HttpClient) { 
  }

  notesChanged(){
    this.notesListChanged.next(this.notesList.slice());
  }

  saveNotes(){
    const allNotes:Note[] = this.notesList.slice();

    if(allNotes.length === 0)
      return;

    this.notesList.map((n)=>{
      n.isSaved = true;
      n.isActive = false;
    });
    this.http.put(this.getNotesUrl, allNotes)
    .subscribe((response)=>{
      console.log('>> response',response);
      
    })
    
  }

  setNotes(newNotes:Note[]){
    this.notesList = newNotes.slice();
    this.notesChanged();
  }
  
  getNotes(){

    this.http.get<Note[]>(this.getNotesUrl).subscribe((allNotes)=>{
      console.log('>> getnotes',allNotes);
      
      this.notesList = allNotes.slice();
      this.notesChanged();
    })
  }

  addEmptyNote(){
    this.notesList.unshift(new Note());
    this.notesChanged();

    console.log('>> notes',this.notesList);
  }

  addNote(newNote: Note){
    this.notesList.push(newNote);
  }

  deleteNote(noteToDelete:Note){
    this.notesList = this.notesList.filter((note)=>{
      return note._id !== noteToDelete._id;
    })

    // console.log('>> delete',this.notesList);
    
    this.notesChanged();
  }

  pinNote(noteItem:Note){
    const index = this.notesList.findIndex((note)=>note._id === noteItem._id);
    const theNote = this.notesList.splice(index,1)[0];

    theNote.isPinned = !theNote.isPinned;
    this.notesList.unshift(theNote);
  
    this.notesChanged();
  }
}
