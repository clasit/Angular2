import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AlumnoListComponent } from './alumno-list/alumno-list.component';
import { AlumnoDetailComponent } from './alumno-detail/alumno-detail.component';
import { AlumnoService } from './services/alumno.service';


@NgModule({
  declarations: [    
    AlumnoListComponent,
    AlumnoDetailComponent
  ],
  imports: [
    CommonModule
  ],
  // Para usarlos los tendremos que exportar
  exports:[AlumnoListComponent, AlumnoDetailComponent],
  providers: [AlumnoService]
})

export class AlumnoModule { }