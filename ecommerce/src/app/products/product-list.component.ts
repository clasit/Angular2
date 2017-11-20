import { Component, OnInit } from '@angular/core';
import { Product } from './product.interface';
import { ProductService } from './product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

  // Se tienen que definir los servicios
  providers: [ProductService]
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


  products:Product[] = [];


filteredProducts:Product[] = [];


              // MECANISMO DE INYECCCIÓN A TRAVÉS DEL CONSTRUCTOR ----------------
              // Poner directamente el 'private' en el parámetro nos evita
              // crear una propiedad privada y asignar. Es un método rápido.
              // Luego _productService será visible en toda la clase
              // simplemente definiéndola en el constructor como parámetro private
              //------------------------------------------------------------------
  constructor(private _productService: ProductService) {    
  }

  get listFilter(){
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter( this.listFilter ) : this.products;
  }
  
  performFilter(filterBy:string):Product[]
  {
    filterBy = filterBy.toLocaleLowerCase();
    /*------------------------------------------------------------------------
    return this.products.filter(      
      // Realiza el filtrado
      function(product:Product){
        // Condición de filtrado. !=-1 Muestra aquellos que se han encontrado
        return ( product.name.toLocaleLowerCase().indexOf(filterBy) !== -1 );
      }      
    );
    ------------------------------------------------------------------------*/

    // Lo mismo mediante funciones arrow
    return this.products.filter(
      // NOTA: Me gustaría saber si esta forma de filtrado es eficiente
      //       Parece que filter será como un bucle y indexOf es otro bucle !!!!
      (p:Product) => p.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  
  toggleImage(){
    this.showImage = !this.showImage;
  }



  /*
   * Este función esta asociado a un
   */
  ratingChange(event, product){
    // Sólo como prueba: cambia el título, usa el tipo de datos del evento
    this.pageTitle = event;

    // Incrementa el rating
    product.rating++;
  }



  ngOnInit() {
    /*-------------------------------------------------------------------------
     * Se usa la clase inyectada, la cual fue inicializada en el constructor.
     * Cuando se trabaje con servicios es mejor poner la inicializacion en
     * ngOnInit que en el constructor.
     *
     * En algunos casos el constructor no se ejecuta y sin embargo si que se
     * ejecuta el ngOnInit.
     *
     * Por norma general:
     * Aqui se pondrán todas aquellas acciones que tienen que ver con las vistas
     * y los servicios.
     *-------------------------------------------------------------------------*/    
    this.products = this._productService.getProducts();

    this.filteredProducts = this.products;
  }  
}
