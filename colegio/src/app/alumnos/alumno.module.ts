import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlumnoListComponent } from './alumno-list/alumno-list.component';
import { AlumnoDetailComponent } from './alumno-detail/alumno-detail.component';
import { AlumnoService } from './services/alumno.service';

import { FormsModule } from '@angular/forms';
import { AlumnoSearchComponent } from './alumno-search/alumno-search.component';

@NgModule({
  declarations: [    
    AlumnoListComponent,
    AlumnoDetailComponent,    
    AlumnoSearchComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule.forChild([
      {path: 'alumnos', component: AlumnoListComponent},
      {path: 'alumno/:alumno', component: AlumnoDetailComponent}
  ])
  ],
  // Para usarlos los tendremos que exportar o directamente cargarlos con el routing...
  exports:[AlumnoListComponent, AlumnoDetailComponent, AlumnoSearchComponent],
  /* No haría falta exportarlos, se cargan mediante el router */

  providers: [AlumnoService]
})

export class AlumnoModule { }