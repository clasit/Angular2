import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private baseUrl = 'api/products';

    constructor(private http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
        return Observable.of(this.initializeProduct());
        // return Observable.create((observer: any) => {
        //     observer.next(this.initializeProduct());
        //     observer.complete();
        // });
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<Response> {
        //TODO
        return null;
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        //TODO
        return null;
    }

    private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        //TODO
        return null;
    }

    private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        //TODO
        return null;
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeProduct(): IProduct {
        // Return an initialized object
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
