import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-start',
  templateUrl: './notes-start.component.html',
  styleUrls: ['./notes-start.component.scss']
})
export class NotesStartComponent implements OnInit {


  isLoading:boolean = true;
  notesList: Note[] = [];
  emptyNoteAdded: boolean = false;
  searchNoteInput: string = '';

  constructor(private notesService: NotesService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.notesService.notesListChanged.subscribe((newNotes) => {
      this.notesList = newNotes;
      this.isLoading = false;
    },(error)=>{
      this.isLoading = false;
    })

    // this.notesService.addEmptyNote();
    this.notesService.getNotes();
  }

  onAddEmptyNote() {
    this.emptyNoteAdded = true;
    this.notesService.addEmptyNote();
  }

  onDelete(noteItem: Note) {
    if (noteItem.title.length === 0 && noteItem.description.length === 0) {
      this.emptyNoteAdded = false;

      if (!noteItem.isSaved) {
        this.toastr.warning('', 'Empty note discarded', {
          timeOut: 1000,
          positionClass: 'toast-top-center'
        })
      }
    } else if (noteItem.isSaved) {

      if (confirm("Are you sure you want to delete this note?")) {

        this.notesService.deleteNote(noteItem);

        this.toastr.error('', 'Note Deleted Successfully', {
          timeOut: 1500,
          positionClass: 'toast-top-center'
        })
      }
    } else{

      this.notesList = this.notesList.filter((note)=>note.id !== noteItem.id);

      this.toastr.warning('', 'That note was discarded without saving', {
        timeOut: 1000,
        positionClass: 'toast-top-center'
      })

    }

  }

  onSaveAllData() {
    console.log('>> new notes', this.notesList);
    this.notesService.setNotes(this.notesList.slice());
    this.notesService.saveNotes();
  }

  onPinClick(noteItem: Note) {
    this.notesService.pinNote(noteItem);
  }

  onGetAllNotesClick() {
    this.notesService.getNotes();
  }
}
