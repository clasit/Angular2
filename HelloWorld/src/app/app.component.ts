import { Component } from '@angular/core';

// Los metadatos empiezan por @
@Component({
  selector: 'app-main',                 // Nombre del tag del componente
  templateUrl: './app.component.html',  // Template (Estructura)
  styleUrls: ['./app.component.css']    // Template (Hoja de estilos)
})

// Clase: La parte lógica del componente
export class AppComponent {
  titulo = 'My App';
  subtitulo = 'Primer ejemplo en Angular 2';
}
