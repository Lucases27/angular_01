import { Component } from '@angular/core';

import { GifsService } from './../../../gifs/services/gifs.service';
import { ThemeService, Theme } from './../../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  tagHistory: string[] = [];
  theme$: Observable<Theme>;

  constructor(
    private gifsService : GifsService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;
  }

  getTagHistory(): string[] {
    return this.gifsService.getTagsHistory();
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

 }
