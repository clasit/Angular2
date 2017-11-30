import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

interface AppState {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  // message: string = 'Hola';
  // Ahora es un Observable que escucha los cambios del estore
  message: Observable<string>;

  // Inyecta el store
  constructor( private store: Store<AppState> ) {
    // Hacemos la susripción. Cada cambio de estado, se recibirá el cambio
    this.message = this.store.select('message');
  }

  /*-----------------------------------------------------------------------
   * Redux cada vez crearía una copia cada vez que se produzca un evento.
   * Guardaría el estado anterior y cambiaría el nuevo estado.
   *----------------------------------------------------------------------*/

  saludarCastellano() {
    // this.message = 'Hola mundo';
    // No se asigna, se lanza un evento

    // (2) Lanza una acción con la propiedad type
    this.store.dispatch({type: 'SPANISH'});
  }

  saludarIngles() {
    // this.message = 'Hello world';
    // No se asigna, se lanza un evento

    // (2) Lanza una acción con la propiedad type
    this.store.dispatch({type: 'ENGLISH'});
  }
}
