import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IAlumno } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';

import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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


  constructor( private _alumnoService: AlumnoService,
               private _router: Router ) {
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


  nuevoAlumno(){
    this._router.navigate(['/form']);
  }


  /*
   *
   */
  borrarAlumno(alumno: IAlumno) {
    this._alumnoService.removeAlumno(alumno);
  }


  /*
   *
   */
  editarAlumno(alumno: IAlumno) {
    // Se tendrána que cargar los datos en el formulario

    /*
    alumno.name = 'Modificado';
    this._alumnoService
      .updateAlumno(alumno)
      .subscribe(
        res => {
          if (res) {
            console.log('Modificación correcta');
          }else {
            console.log('Error en modificación');
          }
        }
      );
    */
  }
}
