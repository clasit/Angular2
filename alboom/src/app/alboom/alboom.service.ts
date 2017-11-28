import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { IPhoto } from './components/photo/photo.interface';


@Injectable()
export class AlboomService {

  private URL: string = 'https://jsonplaceholder.typicode.com/photos?_page=1&_limit=20';
  
  constructor(private _http: HttpClient) { }

  getCollection(): Observable<IPhoto[]>{
    return this._http.get<IPhoto[]>( this.URL );
  }

  getProducts(): Observable<IPhoto[]> {
    return this._http.get<IPhoto[]>( this.URL );
  }
}
