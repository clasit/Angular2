import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from './product.interface';
import { ProductService } from './product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Lista productos';
  private _listFilter: string;
  //products:IProduct[] = [];
  showImage: boolean = false;
  imageWidth: number = 50;
  imageMargin: number = 2;
  showTitle: boolean = true;
  subscription:any;
  
  products:IProduct[];
  //productService: ProductService;

  filteredProducts: Array<IProduct> = [];
  

  get listFilter():string {
    //proceso control
    return this._listFilter;
  }

  set listFilter(value: string){
    //proceso antes de asignacion
    this._listFilter = value;
    
    this.filteredProducts = this.listFilter ? 
        this.performFilter(this.listFilter):this.products;
  }

  constructor(private _productService: ProductService) {
    //this.productService = _productService;
    
  }

  ngOnInit() {
    console.log('ngOnInit_listado');
    this.subscription = this._productService.getProducts()
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = this.products;
      }, (error) => {
        alert(error);
      });
  }

  ngOnDestroy(){
    console.log('ngOnDestroy_listado');
    this.subscription.unsubscribe();
  }

  performFilter(filterBy: string) : IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    /*
    return this.products.filter(function(product:IProduct){
      return (product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    });
    */
    return this.products.filter((product:IProduct) => {
      return (product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    });
  }

  toggleImage(){
    this.showImage = !this.showImage;
  }

  changeView(data:any){
    this.showTitle = data;
  }

}
