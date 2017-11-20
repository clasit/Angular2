import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*-------------------------------------------------------------------------------------------
 * Necesitamos importar FormsModule para usar el ngModule
 *------------------------------------------------------------------------------------------*/
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent } from './shared/star.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';


@NgModule({
  declarations: [     // Array con todos los componentes
    AppComponent,
    ProductListComponent,
    StarComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  // Se tienen que definir los servicios si queremos usarto en toda la plicación
  // providers: [ProductService],

  bootstrap: [AppComponent] // Módulo de inicio de la aplicación
})
export class AppModule { }
