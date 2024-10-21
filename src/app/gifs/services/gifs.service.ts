import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchResponse, Gif } from './../interfaces/gifs.interfaces';

const GIPHY_API_KEY : string = 'QsgPJhkwgIu5aJaBP29y09f2tB98pQPm';
const serviceUrl : string = 'https://api.giphy.com/v1/gifs';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
    console.log(this._tagsHistory[0]);
   }

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
    this.saveLocalStorage();
  }


  private saveLocalStorage() : void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }


  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
  }







}
