import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';



import { IProduct } from './product.interface';

@Injectable()
export class ProductService {

  constructor(private _http:HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>('./api/products/products.json')
            .do(data => console.log("Data:" + JSON.stringify(data)))
            .catch(this.handleError)
  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }

  /* Observable
  getProduct(id:number):Observable<IProduct>{
    return this.getProducts().map((items) => {
      return items.find((item) => item.id == id)
    })
  }
  */

  //Promises
  getProduct(id: number): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      //resolve({name:'Producto 10'})
      //reject("No se ha encontrado producto");
      this.getProducts().subscribe((data) => {
        let p = data.find((item) => item.id == id);
        
        if (p !== null){ //si se ha encontrado...
          resolve(p);
        } else {
          resolve(null)
        }
      }, (error) => {
        reject("Ha habido un error en la obtencion de productos");
      });

    })
  }


}
