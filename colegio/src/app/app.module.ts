import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AlumnoModule } from './alumnos/alumno.module';
import { HttpClientModule } from '@angular/common/http';
import { AlumnoSearchComponent } from './alumnos/alumno-search/alumno-search.component';

// 
// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlumnoModule,
    HttpClientModule,  // Se tiene que importar para poder unser el servicio
    // FormsModule    
    RouterModule.forRoot([            
      { path: '', redirectTo: 'alumnos', pathMatch: "full" },
      { path: '**', redirectTo: 'alumnos', pathMatch: "full" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
