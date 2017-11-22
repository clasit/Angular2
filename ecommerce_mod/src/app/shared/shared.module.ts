
/*
 * Para modularizar la aplicación se crea un modulo
 * El app.module.ts es el módulo principal. 
 * El módulo principal importa 'BrowserModule'
 * Los módulos hijo importan 'CommonModule'
 */


// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    //BrowserModule,
    CommonModule,
    // FormsModule   // Para usar ngModule (Shared no lo usa)
  ],
  // Definir los módulos que se dejan visibles hacía fuera
  exports:[
    StarComponent,
    CommonModule,
    FormsModule     // Pero sique se exporta, sus hijos ya lo tendrán
  ]
})

export class SharedModule { }
