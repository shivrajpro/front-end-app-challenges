import { AfterViewInit, Component, OnInit } from '@angular/core';
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

    this.notesService.notesListChanged.subscribe((newNotes) => {
      this.notesList = newNotes;
    })

    // this.notesService.addEmptyNote();
    // this.notesService.getNotes();
  }

  onAddEmptyNote() {
    this.notesService.addEmptyNote();
  }

  onDelete(noteItem: Note) {
    this.notesService.deleteNote(noteItem);
  }

  onSaveAllData(){
    console.log('>> new notes',this.notesList);
    this.notesService.setNotes(this.notesList.slice());
    this.notesService.saveNotes();
  }

  onPinClick(noteItem:Note){
    this.notesService.pinNote(noteItem);
  }

  onGetAllNotesClick(){
    this.notesService.getNotes();
  }
}
