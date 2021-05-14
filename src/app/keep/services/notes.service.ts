import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  readonly getNotesUrl = 'https://ng-complete-guide-c1ec4.firebaseio.com/notes.json';
  notesList: Note[] = [];
  notesListChanged = new Subject<Note[]>();

  constructor(private http: HttpClient) {
  }

  notesChanged() {
    this.notesListChanged.next(this.notesList.slice());
  }

  saveNotes() {

    this.notesList.map((n) => {
      n.isSaved = true;
      n.isActive = false;
    });


    if (this.notesList.length === 0)
      return;


    this.http.put<Note[]>(this.getNotesUrl, this.notesList)
      .subscribe((response) => {
        console.log('>> after save', response);
        this.notesList = response;
        this.notesChanged();
      })

  }

  setNotes(newNotes: Note[]) {
    this.notesList = newNotes.slice();
    this.notesChanged();
  }

  getNotes() {

    this.http.get<Note[]>(this.getNotesUrl).subscribe((allNotes) => {
      console.log('>> getnotes', allNotes);

      this.notesList = allNotes.slice();
      this.notesChanged();
    })
  }

  addEmptyNote() {
    this.notesList.unshift(new Note());
    this.notesChanged();

    console.log('>> emptynote', this.notesList);
  }

  addNote(newNote: Note) {
    this.notesList.push(newNote);
  }

  deleteNote(noteToDelete: Note) {
    this.notesList = this.notesList.filter((note) => {
      return note.id !== noteToDelete.id;
    })

    this.saveNotes();
  }

  pinNote(noteItem: Note) {
    noteItem.isPinned = !noteItem.isPinned;

    if (noteItem.isPinned) {

      const index = this.notesList.findIndex((note) => note.id === noteItem.id);
      const theNote = this.notesList.splice(index, 1)[0];

      this.notesList.unshift(theNote);

    } else {

      for (let i = 0; i < this.notesList.length; i++) {
        const element = this.notesList[i];

        if (element.id === noteItem.id) {
          element.isPinned = noteItem.isPinned;
          break;
        }

      }
    }

    this.notesChanged();
  }
}
