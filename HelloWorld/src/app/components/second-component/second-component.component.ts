import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Alumno } from '../../../models/alumno.model';


@Component({
  selector: 'second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.css'],
  encapsulation: ViewEncapsulation.None
})


// implementamos la interfaz OnInit
export class SecondComponentComponent implements OnInit {

  /*------------------------------------------------------------------------------
   * Encapsulación: podemos usar los modificadores public/private para proteger
   * las propiedades de un objeto.
   * 
   * Por defecto es 'protected' (Las clases hijas podrán acceder a las propiedades)
   * 
   * NOTA: las templates de un mismo componente tendrán acceso también a las 
   * propiedades privadas.
   *----------------------------------------------------------------------------*/
  public resultado:number = 0;
  private _alumno:Alumno;
  private datosAlumno:string;

  // Se declara una colección que sólo podrá tener objetos de tipo alumno
  private _alumnos:Array<Alumno>;

  private _verListado:boolean = false;

  private _labelBoton:string;

  private nombreUsuario:string = null;



  constructor() {
    this._alumnos = [
      new Alumno('Jesús', 36, 'Angular 2'),
      new Alumno('Rosa', 32, 'Android'),
      new Alumno('Dave', 36, 'Musica')
    ];
  }


  private verDatosAlumnos()
  {
    this._verListado = !this._verListado;
    this._labelBoton = this._verListado ? 'Ocultar' : 'Mostrar';

    /*
    this.datosAlumno = '';
    this._alumnos.forEach(e => {
      this.datosAlumno  += `El alumno de nombre: ${e.nombre}
                            de edad: ${e.edad}
                            asiste al curso: ${e.curso}`;
    });
    */

    /*
    this.datosAlumno  = `El alumno de nombre: ${this._alumno.nombre}
                         de edad: ${this._alumno.edad}
                         asiste al curso: ${this._alumno.curso}`;
    */
  }


  // Está relacionada con 'artefactos' de angular.
  ngOnInit() {
    console.log("Se ha iniciado el componente 'seconde component'!");

    /*-------------------------------------------------------------------
     * Cuando tengamos que mostrar datos en la vista, se tiene que hacer
     * en el método ngOnInit, por que este método se ejecuta cuando está
     * todo renderizado.
     *-----------------------------------------------------------------*/
    this._labelBoton = 'Mostrar';
  }

}
