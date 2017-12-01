import { BooksListComponent } from 'app/books/books-list/books-list.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


describe('AppComponent test',

    () => {
        let component: BooksListComponent,
        mockBookStoreService;

        // IMPORTANTE:
        // Los test unitarios no deben depender un servicio externo
        // Por ello se generará un mock que devuvle los datos.
        beforeEach(
            () => {                                                                 // Nombre del método
                mockBookStoreService = jasmine.createSpyObj('mockBookStoreService', ['getBooks']);
                // Se inyecta el servicio mock en el constructor
                component = new BooksListComponent( mockBookStoreService );
        });


        it('Comprobar si inicialmente el Array de libros está vacío',
            () => {
                // Un it sólo debería tener un expect. Estamos probando sólo una pieza del código
                expect(component.booksList.length).toBe(0);
            }
        );



        // Se puede poner otro describe o poner en el describe anterior
        describe('ngOnInit: Tenemos que simular la carga de la vista',
            () => {
                it('Comproba el número de elementos',
                    () => {
                        const books = [{}, {}];
                        // Cuando se hace un getBooks
                        mockBookStoreService.getBooks.and.returnValue( Observable.of(books) );
                        // Se fuerza la ejecución del ciclo de vida. Ejecutará getBooksList pero contra el servicio mock.
                        component.ngOnInit();
                        // Comprueba que se recibieron 2 elementos
                        expect( component.booksList.length ).toBe(2);
                    },
                );
            }
        );
    });
