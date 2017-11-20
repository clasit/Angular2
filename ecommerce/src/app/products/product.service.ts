import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.interface';


/*
 * Un servicio se define como una clase 'injectable'
 */
@Injectable()
export class ProductService {

  constructor(private _http:HttpClient) { }


  getProducts():Array<Product>
  {
    // Ojo el path. El punto es desde API. Se tiene que configurar "angular-cli.json"

    // get. Nos devuelve un observable !! Tiene que ver con la parte reactiva de Angular
    // Se verán las llamadas síncronas y asíncronas.
    let observable = this._http.get('./api/products/products.json');

  }
}
