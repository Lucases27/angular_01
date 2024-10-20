import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchResponse, Gif } from './../interfaces/gifs.interfaces';

const GIPHY_API_KEY : string = 'gklEXlBUlkW6MYY00Gz931cEZKiSK9fX';
const serviceUrl : string = 'https://api.giphy.com/v1/gifs';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor(private http: HttpClient) { }

  public gifList : Gif[] = [];

  private _tagsHistory: string[] = [];

  getTagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag( tag: string ) : void{
    if( tag.length ===0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
     .set('api_key', GIPHY_API_KEY)
     .set('limit',10)
     .set('q', tag)


    this.http.get<SearchResponse>(`${serviceUrl}/search`,{params})
      .subscribe((response) => {
        this.gifList = response.data;

      });

  }

  private organizeHistory( tag: string ) : void{
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }


}
