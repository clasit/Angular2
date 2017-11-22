import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})


export class StarComponent implements OnInit {

  starWidth:number;
  @Input() rating:number;

  // Crea un EventEmitter y lo inicializa.
  // Esto creará un evento que podra ser recogido por el componente padre.
  @Output() ratingClick: EventEmitter<string>;
  

  constructor() {
    // Inicializa a 'string' como tipo de datos
    this.ratingClick = new EventEmitter<string>();
  }


  /*
   * Va a modificar los datos del padre
   */
  onClick(){
    // Emite un evento con el tipo definido (En este caso string).
    // En la función padre recogemos este parámetro con el parámetro "$event"
    // Esto sería un evento ('observable') que se podría recoger por el componente padre
    this.ratingClick.emit("Event data");
  }


  /*
   * Se ejecuta al crear el componente
   */
  ngOnInit() {
    // this.startWidth = this.rating * 86 / 5;
  }


  /*
   * Se ejecuta cuando cambia cualquiera de las propiedades del componente
   * se necesita importar 'OnChanges' desde el core del angular.
   */
  ngOnChanges(){
    this.starWidth = this.rating * 86 / 5;
  }
}
