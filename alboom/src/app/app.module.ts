import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';


/*---------------------------------------------------------------------
 * Se pondrá todas la librerias de Materials en un componente principal
 * Para que cuando importen el Alboom y venga con todos los componentes
 * del Materials Design.
 * El app.module tiene que ser ligero.
 *--------------------------------------------------------------------*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
