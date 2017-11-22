import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Detalle producto';
  product: IProduct;

  constructor(private _route:ActivatedRoute,
                private _router: Router, 
                private _productService: ProductService  
              ) { }

  ngOnInit() {
    console.log('ngOnInit_detalle');
    //get de la clave 'id'
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    /*
    this._productService.getProduct(id)
      .subscribe((p) => {
        this.product = p;
      })
    */
    this._productService.getProduct(id)
      .then((p) => {
        if (p !== null){
          this.product = p;
        }
      }, (error) => {
        alert(error);
      });
  }

  back() {
    this._router.navigate(['/products']);
  }

  ngOnDestroy(){
    console.log('ngOnDestroy_detalle');
  }

}
