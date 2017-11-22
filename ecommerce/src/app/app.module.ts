import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*-------------------------------------------------------------------------------------------
 * Necesitamos importar FormsModule para usar el ngModule
 *------------------------------------------------------------------------------------------*/
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent } from './shared/star.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductService } from './products/product.service';


@NgModule({
  declarations: [     // Array con todos los componentes
    AppComponent,
    ProductListComponent,
    StarComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,     
    // OJO: Como se hace la importación del router, se agregan las rutas url   
    RouterModule.forRoot([      
      // [RUTA RAIZ]
      { path: '', redirectTo: 'products', pathMatch: "full" }, // El 'pathMatch' indica que tengamos en cuanta toda la URL
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },

      // [CUALQUIER OTRA RUTA] Se podría redirigir a una pagina de "NOT FOUND"
      { path: '**', redirectTo: 'products', pathMatch: "full" },
    ])
  ],
  // Se tienen que definir los servicios si queremos usarto en toda la aplicación
  providers: [ProductService],

  bootstrap: [AppComponent] // Módulo de inicio de la aplicación
})
export class AppModule { }
