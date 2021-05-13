import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-start',
  templateUrl: './notes-start.component.html',
  styleUrls: ['./notes-start.component.scss']
})
export class NotesStartComponent implements OnInit {


  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
  }

  onAddEmptyCard(){
    this.notesService.addEmptyCard();
  }

}
