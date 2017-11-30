import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post.model';
import { Store } from '@ngrx/store';
import { UPDATE } from '@ngrx/store/src/reducer_manager';
import { UPVOTE, DOWNVOTE, EDIT_TEXT } from '../actions/post.action';
import * as PostActions from '../actions/post.action';

// Esto es el estado de la aplicación
interface AppState {
  message: string;
  post: Post;
}


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})


export class PostsComponent implements OnInit {

  message: Observable<string>;
  post: Observable<Post>;
  text: string;

  constructor( private store: Store<AppState> ) {
    // Hacemos la susripción. Cada cambio de estado, se recibirá el cambio
    this.message = this.store.select('message');
    this.post = this.store.select('post');  // Se hace un select sobre
  }                                         // lo añadido en el app.module

  ngOnInit() {
  }

  // Lanza los eventos
  upVote() {
    console.log('upVote');
    this.store.dispatch({type: UPVOTE});
  }

  downVote() {
    console.log('downVote');
    this.store.dispatch({type: DOWNVOTE});
  }

  editText() {
    console.log('editText');
    this.store.dispatch( new PostActions.EditText(this.text) );
  }
}
