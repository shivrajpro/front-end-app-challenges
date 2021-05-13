import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-start',
  templateUrl: './notes-start.component.html',
  styleUrls: ['./notes-start.component.scss']
})
export class NotesStartComponent implements OnInit {


  notesList: Note[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {

    this.notesService.notesListChanged.subscribe((newNotes)=>{
      this.notesList = newNotes;
    })
  
  }

  onAddEmptyCard(){
    this.notesService.addEmptyCard();
  }

  onDelete(noteItem: Note){
    this.notesService.deleteNote(noteItem);
  }
}
