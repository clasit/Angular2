import { Action } from '@ngrx/store';


// Será una función que recibe acciónes. Conocerá el estado incial
// Descriminará las acciones que recibe de UI

export function saludoReducer( state: string = 'Hola', action: Action ) {
    // ¿Que acciones puede recibir? ¿Que debe escuchar?

    // Toda acción recibe al menos type
    switch ( action.type ) {
        case 'SPANISH':
            return state = 'Hola Mundo';
        case 'ENGLISH':
            return state = 'Hello World';
        default:
            return state;   // Se devuelve sin manipularlo
    }
}
