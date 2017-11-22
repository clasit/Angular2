import { Component, OnInit } from '@angular/core';
import { IAlumno } from '../interfaces/alumno.interface';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})

export class AlumnoListComponent implements OnInit {

  private _alumno:IAlumno;
  private _alumnos:IAlumno[];

  constructor() { }

  ngOnInit() {
  }

}
