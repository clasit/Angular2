"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
function getAllBooks() {
    // Por defecto TypeScript los define como tipo 'Any'
    // Es equivalente a poner "let books:any[]"
    var books = [
        { id: 1, title: 'Titulo1', author: 'Autor1', avaliable: true, category: enums_1.Category.Ficcion },
        { id: 2, title: 'Titulo2', author: 'Autor2', avaliable: false, category: enums_1.Category.Poesia },
        { id: 3, title: 'Titulo3', author: 'Autor3', avaliable: false, category: enums_1.Category.CienciaFiccion },
        { id: 4, title: 'Titulo4', author: 'Autor4', avaliable: true, category: enums_1.Category.Tecnico }
    ];
    return books;
}
/*
 * Muestra todos los titulos por pantalla
 */
function display(data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        console.log(item.title);
    }
}
/*
 * Filtrado: sólo devuelve los libre diponibles
 */
function getAvaliable(data) {
    if (data === void 0) { data = getAllBooks(); }
    var avaliableBooks = [];
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var item = data_2[_i];
        if (item.avaliable) {
            avaliableBooks.push(item);
        }
    }
    return avaliableBooks;
}
/*
 *
 */
function getByCategory(cat) {
    if (cat === void 0) { cat = enums_1.Category.Poesia; }
    return LIBROS.filter(function (p) { return p.category == cat; });
}
/*
 *
 */
function getById(id) {
    var book;
    // book = LIBROS.filter( (p) => { return p.id == id} );
    book = LIBROS.filter(function (p) { return p.id == id; });
    if (book) {
        return book[0];
    }
}
// PARÁMETROS OPCIONALES =============================================================
/*
 * 'age' y 'city' son parámetos opcionales
 */
function createUser(name, age, city) {
    // Dentro del cuerpo se tienen que  comprobar si los parámetros opcionales están
    // para tomar decisiones.
}
// PARÁEMTROS REST ===================================================================
/*
 * Devolver si existe y está disponible
 */
function checkoutBooks(name) {
    //===============================================================================
    //
    //===============================================================================
    /*
        let librosCatalogo = [];
        // A partir de las IDs busca todos los libros de catálogo y que estén disponibles
        for(let id of bookIds){
            // let libro = LIBROS.filter( (p) => p.id == id)[0];
            let libro:any = getById( id );
            if( libro && libro.avaliable ) {
                librosCatalogo.push( libro );
            }
        }
    */
    var bookIds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        bookIds[_i - 1] = arguments[_i];
    }
    //===============================================================================
    // Devolver Number[] --> Las IDs de los libros disponibles
    //===============================================================================
    /*
        return bookIds.filter(
            function(id){
                let book:any = getById(id);
                return book && book.avaliable;
        });
    */
    //===============================================================================
    // Devolver Book[] --> Los objetos libro disponibles
    // (NOTA: Falta por implementar)
    //===============================================================================
    /*
        return LIBROS.filter(
            function(book){

            }
        );
    */
}
//////////////////////////////////////////////////////////////////////////////////////
// Usaremos la constante LIBROS para proporcionar datos a todas las funciones
var LIBROS = getAllBooks();
//====================================================================================
// FILTRADO POR DISPONIBILIDAD
//====================================================================================
console.log("\n\n** BÚSQUEDA POR DISPONIBILIDA **");
// MÉTODO 1: Usando una function
// display( getAvaliable() );
// MÉTODO 2: Usando una filter con una 'arrow function'
display(LIBROS.filter(function (p) { return p.avaliable; }));
//====================================================================================
// FILTRADO POR CATEGORÍA
//====================================================================================
console.log("\n\n** BÚSQUEDA POR CATEGORÍA **");
// Devuelve la categoría definida en el parámetro por defecto
display(getByCategory());
// Devuelve la categoría definida implícitamente en la función
// display( getByCategory( Category.Tecnico) );
//====================================================================================
// BÚSQUEDA POR ID
//====================================================================================
console.log("\n\n** BÚSQUEDA POR ID **");
display([getById(4)]);
//====================================================================================
// BÚSQUEDA POR ID Y DISPONIBILIDAD
//====================================================================================
console.log("\n\n** BÚSQUEDA POR ID Y DISPONIBILIDAD **");
display(checkoutBooks('', 1, 2, 3, 99));
//# sourceMappingURL=biblioteca.js.map