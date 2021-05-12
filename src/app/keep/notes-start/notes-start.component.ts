import { Component, OnInit } from '@angular/core';

export class Card{
  constructor(public title?:string, public description?:string, public isPinned?:boolean){
    this.title = '';
    this.description = '';
    this.isPinned = false;
  }
}
@Component({
  selector: 'app-notes-start',
  templateUrl: './notes-start.component.html',
  styleUrls: ['./notes-start.component.scss']
})
export class NotesStartComponent implements OnInit {

  emptyCardsList: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddEmptyCard(){
    this.emptyCardsList.push(new Card());
  }

}
