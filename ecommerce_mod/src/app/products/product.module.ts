// No hace falta importar 'CommonModule' por que viene dado por el 'shared'
// import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router/src/router_module';

import { ProductListComponent } from '../products/product-list.component';
import { ProductDetailComponent } from '../products/product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductService } from '../products/product.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
      ProductListComponent,
      ProductDetailComponent,
      ConvertToSpacesPipe
  ],
  providers: [
    ProductService
  ],
  imports: [
        // Se importa el shared module se necesita, por que product hace uso del componente star
        SharedModule,   // Viene con el -> StarComponent, CommonModule, FormsModule

        // Se pone también el sistema de navegación. Pero si no está en el 
        // archivo princial se pondrá 'forChild', por no ser el módulo principal.
        RouterModule.forChild([
            {path: 'products', component: ProductListComponent},
            {path: 'products/:id', component: ProductDetailComponent}
        ])
  ],
})

export class ProductModule { }
