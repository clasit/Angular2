import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductService } from './product.service';
import { SharedModule } from './../shared/shared.module';

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
    RouterModule.forChild([
        {path: 'products', component: ProductListComponent},
        {path: 'products/:id', component: ProductDetailComponent},
    ]),
    SharedModule
  ]
})
export class ProductModule { }
