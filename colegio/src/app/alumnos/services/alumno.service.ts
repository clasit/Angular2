import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IAlumno } from '../interfaces/alumno.interface';



@Injectable()
export class AlumnoService {

  private alumnos:IAlumno[];
  private subject:Subject<IAlumno[]> = new Subject<IAlumno[]>();
  private URL:string = "http://192.168.4.3:3000/alumns";

  
  // Inyectamos HttpClient
  constructor(private _http:HttpClient) {
    /*
     * Se sarga en Local Storage, el array completo de alumnos
     */
    this._http.get<IAlumno[]>(this.URL).subscribe(
        (alumnos) => {
            this.alumnos = alumnos;

            // La función next emite un nuevo evento
            this.subject.next(this.alumnos);

            localStorage.setItem('alumnos', JSON.stringify(this.alumnos) );
        },
        (error) => { alert('Imposible leer los datos') }
      );
  }

  

  // Devuelve todos los alumanos
  getAlumnos():Observable<IAlumno[]>{
    // return this._http.get<IAlumno[]>(this.URL);
    this.alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    
    // Devuleve un observable (permitiendo la subscripción)
    // return Observable.of( this.alumnos );

    // Devuelve el subject como un observable
    return this.subject.asObservable()
  }


  // Devuelve un alumno
  getAlumno( id:any ):Observable<IAlumno>{
    return this.getAlumnos().map(
      (items) => { 
        console.log(items);
        return items.find( item => item._id == id ) 
      }
    )
  }




  //------------------------------------------------------------------------
  // Persistencia en Local Storage =========================================
  //------------------------------------------------------------------------
  setAlumno(al: IAlumno): Observable<boolean> {

    try {
      // (1) Recuperar la colección de todos los alumnos
      this.alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];   // localStorage es un méditod de HTML5

      // (2) Añadir a esa colección el nuevo alumno
      this.alumnos.push(al);

      // (3) Persistir la colección modificada
      localStorage.setItem( 'alumnos', JSON.stringify(this.alumnos) );

      // Se vuelve a enviar un pulso
      this.subject.next(this.alumnos);

      return Observable.of(true);
    }catch (ex) {
      return Observable.of(false);
    }
  }



  updateAlumno(al: IAlumno):Observable<boolean>{
    // (1) Recuperar los alumnos dados de alta anteriormente
    this.alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    
    // (2) Si find devuelve una referencia se podría importar directamente
    let alumno = this.alumnos.find( (item) => item.dni == al.dni );

    if ( alumno !== null ) {
      const index = this.alumnos.indexOf(alumno);
      this.alumnos[index] = al;

      // Se vuelve a enviar un pulso
      this.subject.next(this.alumnos);

      localStorage.setItem( 'alumnos', JSON.stringify(this.alumnos) );
    }

    return Observable.of(true);
  }



  removeAlumno(al: IAlumno):Observable<boolean>{
    // (1) Recuperar los alumnos dados de alta anteriormente
    this.alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    // (2) Si find devuelve una referencia se podría importar directamente
    let alumno = this.alumnos.find( (item) => item.dni == al.dni );    

    if ( alumno !== null ){      
      let index = this.alumnos.indexOf(alumno);
      this.alumnos.splice(index, 1);

      // Se vuelve a enviar un pulso. El que esté subscrito en getAlumnos se le informa.
      this.subject.next(this.alumnos);

      localStorage.setItem( 'alumnos', JSON.stringify(this.alumnos) );
    }

    return Observable.of(true);
  }
  //========================================================================
}
