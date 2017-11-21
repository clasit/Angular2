import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// (1) Importamos Observable
import { Observable } from 'rxjs/Observable';   // Es de ReactiVex (http://reactivex.io/)

// A los observables se pueden aplicar operaciones y control de errores mediante la 
// siguiente librería. Añadimos a Observable estas funciones:
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import { Product } from './product.interface';
import { HttpResponse } from '@angular/common/http/src/response';


/*
 * Un servicio se define como una clase 'injectable'
 */
@Injectable()
export class ProductService {

  constructor(private _http:HttpClient) { }


  // (2) Devuelve un tipo observable que es un array de productos
  getProducts():Observable<Product[]>
  {
    // Ojo el path. El punto es desde API. Se tiene que configurar "angular-cli.json"

    // get. Nos devuelve un observable !! Tiene que ver con la parte reactiva de Angular
    // Se verán las llamadas síncronas y asíncronas.
    // El get nos devolverá unos datos. tendremos que hacer un 'Casting' <Product[]>
    return this._http
                .get<Product[]>('./api/products/products.json')
                // Desvío para ver todos los datos en consola
                .do( data => console.log("\n\n\n Data:" + JSON.stringify(data)))
                // En caso de error
                .catch( this.handleError );
  }


  /*
   * Devolverá un sólo producto
   */
  // getProductById( id:string ):Observable<Product>{
  //  return this._http.get<Product>('./api/products/product1.json');
  // }

  getProductById( id:any ):Observable<Product>{
    // 'map' : transform the items emitted by an Observable by applying a function to each item
    // Es similar a PHP
    return this.getProducts().map(
      (items) => { return items.find( item => item.id == id ) }
    )
  }
  

  // Función gestión del error mediante un catch
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
