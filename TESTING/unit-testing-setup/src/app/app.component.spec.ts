import { AppComponent } from './app.component';

// EJECUCIÓN DEL TEST UNITARIO: "npm run test"

// Se va a utilizar la API de Jasmine para lanzar test unitarios

describe('AppComponent test',

    () => {
        let component: AppComponent;

        // Se hace una instancia por cada componente
        // Cada test (it) tiene su propio objeto
        beforeEach(
            () => {
                component = new AppComponent();
        });

        // Prueba el valor inicial
        it('name esta inicializado con el valor Angular',
            () => {
                                      // toBe es el 'matcher'
                expect(component.name).toBe('Angular');
            }
        );

        // Prueba si se puede modificar el valor
        it('name tiene el valor Angular X',
            () => {
                component.name = 'Angular X';
                expect(component.name).toBe('Angular X');
            }
        );

        // Se podría poner otro describe
        describe('',
            () => { }
        );
    }

);
