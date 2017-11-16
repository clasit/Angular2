import { Component } from "@angular/core";


@Component({
    selector: 'hola-mundo',
    templateUrl: "./hola-mundo.component.html",
    /* template: `<div class="hola-mundo">
                <p>Esto es un prueba de componente</p>
                <p>Componente: {{ nombreCmp }}</p>
                <p>{{ nombreCmp.toLowerCase() }}</p>
              </div>`, 
    */
    styleUrls: ['./hola-mundo.component.css']
    /*     styles: [`.hola-mundo{
                color: blue;
                font-size: 1.3em;
                font-style: bold;}`
            ] 
    */
})


// 'export' indica que la clase puede ser utilizada desde fuera, mediante un import
export class HolaMundoComponent{
    nombreCmp = 'HOLA MUNDO';
}