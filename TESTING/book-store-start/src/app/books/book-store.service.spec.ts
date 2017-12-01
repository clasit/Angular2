import { BookStoreService } from './book-store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Book } from './book';

describe('BookStoreService test',

    () => {
        let service: BookStoreService,
            mockHttp;

        // beforeAll    => Se ejecuta antes de todos
        // beforeEach   => Se ejecuta antes de cada 'it'
        beforeEach(
            () => {
                // Se hace un mock de httpClient. Del servicio inyectado en el servicio.
                mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post', 'delete', 'put']);
                service = new BookStoreService( mockHttp );
        });

        // Se puede poner otro describe o poner en el describe anterior
        describe('Test del deleteBook',
            () => {
                it('Probar el borrado de 1 libro',
                () => {

                    const book: Book = {
                        id: 12,
                        isbn: 898989,
                        title: 'Libro mock',
                        authors: 'Ricardo',
                        published: 'fecha',
                        description: '',
                        coverImage: ''
                    };

                    mockHttp.delete.and.returnValue( Observable.of(book) );
                    const response = service.deleteBook( book.id );
                    response.subscribe( (value) => {
                        expect(value).toBe(book);
                    });
                }
            );
            it('Invocar el http delete es correcta y además el parámetro url tiene el valor correcto',
                    () => {
                        const id = 12;
                        const url = `${service.baseUrl}${id}`;
                        // Observable de true, no nos insterea el valor, sino sólo la llamada
                        mockHttp.delete.and.returnValue( Observable.of(true) );
                        const response = service.deleteBook(id);            // Cualquier objecto (headers?)
                        expect( mockHttp.delete ).toHaveBeenCalledWith(url, jasmine.any(Object));
                    },
                );
            }
        );
    });
