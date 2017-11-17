import { Book } from './interfaces';
import { Category } from './enums';


function getAllBooks():Book[]{

    let books:Book[] = [
        {
            id:1,title:'Titulo1', author:'Autor1',available:true,category:Category.Ficcion
        },
        {
            id:2,title:'Titulo2', author:'Autor2',available:false,category:Category.Poesia
        },
        {
            id:3,title:'Titulo3', author:'Autor3',available:true,category:Category.Tecnico
        },
        {
            id:4,title:'Titulo4', author:'Autor4',available:true,category:Category.Poesia
        },
        {
            id:5,title:'Titulo5', author:'Autor5',available:false,category:Category.Ficcion
        }

    ];

    return books;

}

//TASK: todos los libros que esten disponibles
function getAvailableBooks(allBooks:Book[] = getAllBooks()):Book[]{
    let availableBooks:Book[] = [];
    //let allBooks:Array<any> = getAllBooks();

    for(let book of allBooks){
        //saber si esta disponible o no
        if (book.available === true){
            availableBooks.push(book);
        }
    }

    return availableBooks;
}

function getBooksByCategory(cat:Category = Category.Poesia){
    let filteredBooks:Book[] = [];
    let allBooks:Array<Book> = getAllBooks();

    for(let book of allBooks){
        //saber si esta disponible o no
        if (book.category === cat){
            filteredBooks.push(book);
        }
    }

    return filteredBooks;

}

function getBookById(id:number):Book {
    const books:Book[] = getAllBooks();

    let book:Book;
    let filteredBooks:Book[];

    /*
    filteredBooks = books.filter(function(book){
        return book.id === id;
    });
    */
    filteredBooks = books.filter( book => book.id === id);


    if (filteredBooks.length > 0){
        book = filteredBooks[0];
    }

    return book;
}

function createUser(name:string, age?:number, city?:string){

    if (age){

    }

    if (city){

    }
}

function checkoutBooks(name:string, ...bookIds: number[]):Book[]{
    let booksCheckout:Book[] = [];
    
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
    booksCheckout = getAllBooks().filter(function(book){
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

function display(data:Book[]){
    for(let item of data){
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
display(checkoutBooks('Ricardo', 1,2,7));
