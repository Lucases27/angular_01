import { Component, Input, OnInit, Output } from '@angular/core';
import { Gif } from '../../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  ngOnInit(): void {
    if ( !this.gif ) throw new Error("No gif");
  }



  @Input()
  public gif!: Gif;

  @Output()
  public gifs: Gif[] = [];

}
