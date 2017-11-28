import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData }  from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
//TODO: GUards...
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,  // Es necesario para usar formularios reactivos
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id',
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
    ProductService
  ]
})
export class ProductModule {}
