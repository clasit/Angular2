import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';


import { IAlumno } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';


@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.css']
})
export class AlumnoDetailComponent implements OnInit {

  @Input() alumno:IAlumno;

  constructor(private _route:ActivatedRoute,
              private _alumnoService: AlumnoService) { }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');

    this._alumnoService.getAlumno(id)
      .subscribe(          
          (alumno) => {
            console.log(alumno);
            this.alumno = alumno;
          },          
          (error) => { alert(error) }
      );
  }

}
