import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.interface';
import { ProductService } from './product.service';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

  // Se tienen que definir los servicios
  // providers: [ProductService]
})


export class ProductListComponent implements OnInit, OnDestroy {

  subscription: any;

  /*----------------------------------------------------------------------
   * Se puede usar tanto la interpolación con una variable pública
   * o también definiendo 'get'. Está última manera sería la más correcta.
   *---------------------------------------------------------------------*/
  pageTitle:string = "Lista de productos";
  private _listFilter:string;
  private showImage:boolean = false;
  private imageWidth:number = 50;
  private imageMargin:number = 10;

  
  /*** products:Observable<Product[]>; ***/
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

    // Programación ASÍNCRONA, se lanza la petición y se queda 'observando' 
    // SE SUSCRIBE AL OBSERVABLE

    //--------------------------------------------------------------------------
    // MÉTODO 1: 
    //--------------------------------------------------------------------------
    this.subscription =
        this._productService.getProducts()
          .subscribe(
              // Caso 1: Success
              (products) => {
                this.products = products;
                this.filteredProducts = this.products;
              },
              // Caso 2: Error
              (error) => { alert(error) },
              // Finally
              () => { console.log('Finally') }
          );

    //--------------------------------------------------------------------------
    // MÉTODO 2: más simprifica usando la notación sincrona
    // Se define products como Observable y en el template se tiene que definir async para
    // que funcionara de forma asyncrona.
    // <tr *ngFor="let product of products | async">
    // De este modo se simplica el código
    //--------------------------------------------------------------------------
    /*** this.products = this._productService.getProducts(); ***/
  }


  /*
   * Optimización: Cuando se termina el ciclo del componente quitamos la subscripción
   * Es un ejemplo de optimización, el socket ya se cerraría automática al destruirse el objeto.
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
