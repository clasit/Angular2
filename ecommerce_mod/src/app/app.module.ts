import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';

/*-------------------------------------------------------------------------------------
// Se eliminan, pues ya vienen de Product
//-------------------------------------------------------------------------------------
  import { FormsModule } from '@angular/forms';
  import { ProductListComponent } from './products/product-list.component';
  import { StarComponent } from './shared/star.component';
  import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
  import { ProductDetailComponent } from './products/product-detail.component';
  import { ProductService } from './products/product.service';
-------------------------------------------------------------------------------------*/

@NgModule({
  declarations: [     // Array con todos los componentes
    AppComponent,
    // ProductListComponent,
    // StarComponent,
    // ConvertToSpacesPipe,
    // ProductDetailComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    // OJO: Como se hace la importación del router, se agregan las rutas url   
    RouterModule.forRoot([            
      { path: '', redirectTo: 'products', pathMatch: "full" }, // El 'pathMatch' indica que tengamos en cuanta toda la URL
      { path: '**', redirectTo: 'products', pathMatch: "full" },
      // { path: 'products', component: ProductListComponent },
      // { path: 'products/:id', component: ProductDetailComponent },
    ]),

    ProductModule
  ],
  // Se tienen que definir los servicios si queremos usarto en toda la aplicación
  /*** providers: [ProductService], ***/
  bootstrap: [AppComponent]   // Módulo de inicio de la aplicación
})

export class AppModule { }
