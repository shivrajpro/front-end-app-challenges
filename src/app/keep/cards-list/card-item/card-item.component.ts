import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../notes-start/notes-start.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() cardItem: Card;
  
  constructor() { }

  ngOnInit(): void {
  }

}
