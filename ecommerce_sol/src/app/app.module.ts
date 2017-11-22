import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'', redirectTo:'products', pathMatch: 'full'},
      { path:'**', redirectTo:'products', pathMatch: 'full'},
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
