import { Component } from '@angular/core';

import { GifsService } from './../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  tagHistory: string[] = [];

  constructor(private gifsService : GifsService) {

  }

  getTagHistory(): string[] {
    return this.gifsService.getTagsHistory();
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

 }
