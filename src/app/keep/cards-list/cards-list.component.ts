import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../notes-start/notes-start.component';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {

  @Input() cardsList: Card[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
