import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData }  from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
//TODO: Guards...
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,  // Es necesario para usar formularios reactivos
    // De este modo se usar un Servicio Rest en memoria para hacer mocks
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id',  // Alta o edición ( id == 0 ==> 'ALTA' )
        component: ProductDetailComponent
      },
      { path: 'productEdit/:id',
        component: ProductEditComponent },
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
  ]
})
export class ProductModule {}
