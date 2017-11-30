import { AppComponent } from './app.component';
// import { TestBed, inject } from '@angular/core/testing';


// Se va a utilizar la API de Jasmine para lanzar test unitarios

describe('AppComponent test', 

    () => {
        let component: AppComponent;

        beforeEach(
            () => {
                component = new AppComponent();
        });

        // Prueba el valor inicial
        it('name esta inicializado con el valor Angular',
            () => {
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
    }

);
