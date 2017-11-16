import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HolaMundoComponent } from '../components/hola-mundo.component';
import { SecondComponentComponent } from './components/second-component/second-component.component';  // Ojo, no se pone la extensión '.ts'


@NgModule({

  // Lista de componentes del modulo
  declarations: [
    AppComponent,          // Todos los componentes que forman parte del módulo
    HolaMundoComponent, 
    SecondComponentComponent
  ],

  imports: [
    BrowserModule         // Modulos propios de Angular, se tendrán que importar a medida que se necesiten
  ],                      // También se puede vincular aquí nuestros propios modulos

  providers: [],          

  // Indica que es el componente principal de nuestra aplicación (El que se inserta en .html)
  bootstrap: [AppComponent]   // Sólo puede haber un componente principal
})                            // En algunos casos se puden usar 2 componentes principales, pero no es lo habitual


export class AppModule { }
