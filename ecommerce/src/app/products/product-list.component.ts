import { Component, OnInit } from '@angular/core';
import { Product } from './product.interface';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  /*----------------------------------------------------------------------
   * Se puede usar tanto la interpolación con una variable pública
   * o también definiendo 'get'. Está última manera sería la más correcta.
   *---------------------------------------------------------------------*/
  pageTitle:string = "Lista de productos";
  private _listFilter:string;
  private showImage:boolean = false;
  private imageWidth:number = 50;
  private imageMargin:number = 10;

  products:Product[] = [
    { 
      id: 78954,
      name: 'Producto 1',
      code: 'P-1',
      relaseDate: '18 Noviembre',
      description:'Calidad / precio',
      price: 99,
      rating: 4,
      imageUrl: 'https://www.travelreport.mx/wp-content/uploads/2017/11/comida-tlaxcala-100x100.jpg'
    },
    { 
      id: 78955,
      name: 'Producto 2',
      code: 'P-3',
      relaseDate: '1 Enero',
      description:'Calidad / precio',
      price: 99,
      rating: 4,
      imageUrl: 'http://d2z8v02fmnep0k.cloudfront.net/sites/elobservatodo.cl/files/imagecache/100x100/comida_semana_santa_que_cocinar_viernes_santo_ceviche_0.jpg'
    }
  ]

  constructor() { }

  get listFilter(){
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
  }
  
  toggleImage(){
    this.showImage = !this.showImage;
  }

  ngOnInit() {
  }

}
