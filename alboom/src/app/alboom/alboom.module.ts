// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatCard, MatCardModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {Component} from '@angular/core';

// Cumtom Components
import { CollectionComponent } from './components/collection/collection.component';
import { AlboomService } from './alboom.service';
import { PhotoComponent } from './components/photo/photo.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule
  ],
  declarations: [CollectionComponent, PhotoComponent],
  exports: [CollectionComponent],
  providers: [AlboomService]
})
export class AlboomModule { }
