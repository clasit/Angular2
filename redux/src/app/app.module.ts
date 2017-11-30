import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importamos el store de REDUX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { saludoReducer } from './saludo.reducer';
import { postReducer } from './reducers/post.reducer';
import { PostsModule } from './posts/posts.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PostsModule,
    AppRoutingModule,  // Pone el routing en un módulo a parte
    StoreModule.forRoot({
      // MODELO: REDUCER (Vincula modelo con el Reducer)
      message: saludoReducer,
      post: postReducer
    }),
    StoreDevtoolsModule.instrument({  // Configurados la configuración del debugger redux
      maxAge: 10                      // Con la extensión de Chrome 'Redux DevTools'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
