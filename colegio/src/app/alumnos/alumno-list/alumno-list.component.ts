import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IAlumno } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';

import { error } from 'util';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})


export class AlumnoListComponent implements OnInit {

  private listFilter:string;

  // Hacer mediante GET y SET
  private alumno:IAlumno;
  private alumnos:IAlumno[];

  

  constructor( private _alumnoService: AlumnoService ) {
  }

  
  getDetailAlumno(alumno){
    // ¿ Como pasar el alumno al componente alumno-detail (mediante un 'Input') ?
    console.log( alumno );
  }


  ngOnInit() {    
    this._alumnoService.getAlumnos()
    .subscribe(
      (alumnos) => { this.alumnos = alumnos },
      (error) => { alert('Imposible leer los datos') }
    );
  }


  /*
   * Añadimos un nuevo alumno
   */
  nuevoAlumno(){
    let alumno = {
      _id: 777,
      dni: '20464767P',
      name: 'Jesús',
      surname: 'Muñoz Fortuño',
      curse: 'Angular2',
      avatar: '',
      notes: [6, 7, 7, 5]
    }

    console.log(alumno);

    // Se modifica, pero no se refresca, tendremos que actualziar
    // la lista con Subject y Subject suscriber...    
    this._alumnoService.setAlumno(alumno);    
  }
}
