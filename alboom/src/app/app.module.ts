import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AlboomModule } from './alboom/alboom.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AlboomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
