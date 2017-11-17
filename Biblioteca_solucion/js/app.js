"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
function getAllBooks() {
    var books = [
        {
            id: 1, title: 'Titulo1', author: 'Autor1', available: true, category: enums_1.Category.Ficcion
        },
        {
            id: 2, title: 'Titulo2', author: 'Autor2', available: false, category: enums_1.Category.Poesia
        },
        {
            id: 3, title: 'Titulo3', author: 'Autor3', available: true, category: enums_1.Category.Tecnico
        },
        {
            id: 4, title: 'Titulo4', author: 'Autor4', available: true, category: enums_1.Category.Poesia
        },
        {
            id: 5, title: 'Titulo5', author: 'Autor5', available: false, category: enums_1.Category.Ficcion
        }
    ];
    return books;
}
//TASK: todos los libros que esten disponibles
function getAvailableBooks(allBooks) {
    if (allBooks === void 0) { allBooks = getAllBooks(); }
    var availableBooks = [];
    //let allBooks:Array<any> = getAllBooks();
    for (var _i = 0, allBooks_1 = allBooks; _i < allBooks_1.length; _i++) {
        var book = allBooks_1[_i];
        //saber si esta disponible o no
        if (book.available === true) {
            availableBooks.push(book);
        }
    }
    return availableBooks;
}
function getBooksByCategory(cat) {
    if (cat === void 0) { cat = enums_1.Category.Poesia; }
    var filteredBooks = [];
    var allBooks = getAllBooks();
    for (var _i = 0, allBooks_2 = allBooks; _i < allBooks_2.length; _i++) {
        var book = allBooks_2[_i];
        //saber si esta disponible o no
        if (book.category === cat) {
            filteredBooks.push(book);
        }
    }
    return filteredBooks;
}
function getBookById(id) {
    var books = getAllBooks();
    var book;
    var filteredBooks;
    /*
    filteredBooks = books.filter(function(book){
        return book.id === id;
    });
    */
    filteredBooks = books.filter(function (book) { return book.id === id; });
    if (filteredBooks.length > 0) {
        book = filteredBooks[0];
    }
    return book;
}
function createUser(name, age, city) {
    if (age) {
    }
    if (city) {
    }
}
function checkoutBooks(name) {
    var bookIds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        bookIds[_i - 1] = arguments[_i];
    }
    var booksCheckout = [];
    /*
    //aproximacion clasica
    for(let ident of bookIds){
        let book = getBookById(ident);
        if (book && book.available){
            booksCheckout.push(book);
        }
    }
    */
    //aproximacion funcional
    /*
    booksCheckout = bookIds.filter(function(ident){
        let book = getBookById(ident);
        console.log(book.title);
        return book && book.available;
    });
    */
    booksCheckout = getAllBooks().filter(function (book) {
        //let book = getBookById(ident);
        return (bookIds.indexOf(book.id) != -1) && book.available;
    });
    /*
    //aproximacion funcional - ARROW
    booksCheckout = bookIds.filter((ident) => {
        let book = getBookById(ident);
        return book && book.available;
    });
    */
    return booksCheckout;
}
function display(data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        console.log(item.title);
    }
}
//obtener todos los libros
//->let libros:any[];
//->libros = getAllBooks();
//->display(libros);
//obtener solo los libros con disponibilidad
//->let libros:any[];
/*
libros = getAvailableBooks([{
    title:'Titulo1', available:true
},
{
    title:'Titulo2', available:false
}]);
display(libros);
*/
/*
let libros:any[];
libros = getBooksByCategory(Category.Ficcion);
display(libros);
*/
/*
let book = getBookById(5);
if (book !== null){
    console.log(book.title);
}
*/
//reserva
display(checkoutBooks('Ricardo', 1, 2, 7));
//# sourceMappingURL=app.js.map