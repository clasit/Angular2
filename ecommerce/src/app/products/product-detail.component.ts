import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { Product } from './product.interface';
import { ProductService } from './product.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],

  // Se tienen que definir los servicios
  // providers: [ProductService]
})


export class ProductDetailComponent implements OnInit {

  pageTitle:string = "Detalle producto";
  product:Product;

  // Se necesitan 2 dependencias para hacer llegar los parámetros del router
  constructor(private _route:ActivatedRoute, 
              private _router:Router,
              private _productService: ProductService) { }


  /*
   * Para ver el detalle del producto.
   * Esto es para probar el sistema de enroutado de Angular.
   */ 

  ngOnInit() {

    // LECTURA DE PARÁMETROS: 

    // MÉTODO 1 ------------------------------------------------------------------------------
    // Se hace un get del id. Para ello usaremos determinadas las componentes 'ActivatedRoute' y 'Router'
    // Un truco para hacer un cast de string a number (Poner el + como prefijo a una variable)    
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    // MÉTODO 2 ------------------------------------------------------------------------------
    // this._route.params.forEach( (params: Params ) => {
    //  console.log('params.id: ', params.id);
    // })
    //-----------------------------------------------------------------------------------------

    // Carga los detalles del producto
    this._productService.getProductById(id)
      .subscribe(
          // Caso 1: Success
          (product) => {
            this.product = product;
            console.log(this.product);
          },
          // Caso 2: Error
          (error) => { alert(error) }
      );
  }

}
