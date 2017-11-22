import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AlumnoModule } from './alumnos/alumno.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlumnoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
