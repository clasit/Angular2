"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/observable/of");
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.baseUrl = 'api/products';
    }
    ProductService.prototype.getProducts = function () {
        var url = "" + this.baseUrl;
        // Va a buscar el producto en la base de datos
        return this.http.get(url)
            .map(this.extractData)
            .do(function (data) { return console.log(data); }) // Muestra la información a modo de debug
            .catch(this.handleError);
    };
    ProductService.prototype.getProduct = function (id) {
        if (id === 0) {
            return Observable_1.Observable.of(this.initializeProduct());
        }
        var url = this.baseUrl + "/" + id;
        // Va a buscar el producto en la base de datos
        return this.http.get(url)
            .map(this.extractData)
            .do(function (data) { return console.log(data); }) // Muestra la información a modo de debug
            .catch(this.handleError);
    };
    ProductService.prototype.deleteProduct = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + id;
        return this.http.delete(url, options) // Devuelve un Observable<Response>
            .catch(this.handleError);
    };
    ProductService.prototype.saveProduct = function (product) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // Descriminamos si es una alta o una edición
        if (product.id === 0) {
            return this.createProduct(product, options); // Delvolverá un observable
        }
        {
            return this.updateProduct(product, options); // Delvolverá un observable
        }
    };
    ProductService.prototype.createProduct = function (product, options) {
        product.id = undefined;
        return this.http.post(this.baseUrl, product, options)
            .map(this.extractData) // Del response se toma sólo el body con extractData
            .do(function (data) { return console.log(JSON.stringify(data)); }) // 
            .catch(this.handleError);
    };
    ProductService.prototype.updateProduct = function (product, options) {
        var url = this.baseUrl + "/" + product.id;
        // Map ejecuta una función anónima sin parámetros, que 
        return this.http.put(url, product, options) // Devuelve un Observable<IProduct>
            .map(function () { return product; }) // Devuelve un objecto IProduct
            .catch(this.handleError);
    };
    ProductService.prototype.extractData = function (response) {
        var body = response.json();
        return body.data || {};
    };
    ProductService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ProductService.prototype.initializeProduct = function () {
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
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map