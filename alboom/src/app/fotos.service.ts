import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FotosService {

  private URL: string = 'http://192.168.4.3:3000/alumns';

  constructor(private _http: HttpClient) {
    
  }

}
