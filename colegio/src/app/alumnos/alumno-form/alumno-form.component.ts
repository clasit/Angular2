import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})

export class AlumnoFormComponent implements OnInit {

  constructor(private _alumnoService: AlumnoService, private _router: Router) { }

  ngOnInit() {
  }


  guardarDatos(values) {
    console.log(values);
    this._alumnoService.setAlumno(values).subscribe(
      (result) => {
        if (result) {
          console.log('Inserción correcta');
          this._router.navigate(['/alumnos']);
        }
      },
      (error)  => { console.log('Error insertando los datos'); }
    );
  }

}
