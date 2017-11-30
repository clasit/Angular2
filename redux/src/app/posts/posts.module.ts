import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: 'posts', component: PostsComponent}])
  ],
  declarations: [ PostsComponent ]
})

export class PostsModule { }
