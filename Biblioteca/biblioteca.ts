import {Category} from './enums';
import {Book} from './interfaces'



function getAllBooks():Book[]{
    // Por defecto TypeScript los define como tipo 'Any'
    // Es equivalente a poner "let books:any[]"
    let books:Book[] = [
        { id: 1, title: 'Titulo1', author: 'Autor1', avaliable: true,  category: Category.Ficcion },
        { id: 2, title: 'Titulo2', author: 'Autor2', avaliable: false, category: Category.Poesia },
        { id: 3, title: 'Titulo3', author: 'Autor3', avaliable: false, category: Category.CienciaFiccion },
        { id: 4, title: 'Titulo4', author: 'Autor4', avaliable: true,  category: Category.Tecnico }
    ];

    return books;
}



/*
 * Muestra todos los titulos por pantalla
 */
function display(data:Book[]){
    for(let item of data){
        console.log(item.title);
    }
}



/*
 * Filtrado: sólo devuelve los libre diponibles
 */
function getAvaliable(data:Book[] = getAllBooks()):Book[]{
    let avaliableBooks:Array<Book> = [];
    for(let item of data){        
        if( item.avaliable ){
            avaliableBooks.push(item);
        }
    }
    return avaliableBooks;
}


/*
 *
 */
function getByCategory( cat:Category = Category.Poesia ): Book[]{
    return LIBROS.filter( (p) => p.category == cat )
}



/*
 *
 */
function getById( id:Number ): Book{
    let book:Book[];

    // book = LIBROS.filter( (p) => { return p.id == id} );
    book = LIBROS.filter( (p) => p.id == id);
    if(book){
        return book[0];
    }
}



// PARÁMETROS OPCIONALES =============================================================


/*
 * 'age' y 'city' son parámetos opcionales
 */
function createUser(name:string, age?:number, city?:string){

    // Dentro del cuerpo se tienen que  comprobar si los parámetros opcionales están
    // para tomar decisiones.
}



// PARÁEMTROS REST ===================================================================

/*
 * Devolver si existe y está disponible
 */
function checkoutBooks(name:string, ...bookIds: number[])
{
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
const LIBROS:Book[] = getAllBooks();



//====================================================================================
// FILTRADO POR DISPONIBILIDAD
//====================================================================================
console.log("\n\n** BÚSQUEDA POR DISPONIBILIDA **");

// MÉTODO 1: Usando una function
// display( getAvaliable() );

// MÉTODO 2: Usando una filter con una 'arrow function'
display( LIBROS.filter( (p) => p.avaliable ) );



//====================================================================================
// FILTRADO POR CATEGORÍA
//====================================================================================
console.log("\n\n** BÚSQUEDA POR CATEGORÍA **");

// Devuelve la categoría definida en el parámetro por defecto
display( getByCategory() );

// Devuelve la categoría definida implícitamente en la función
// display( getByCategory( Category.Tecnico) );



//====================================================================================
// BÚSQUEDA POR ID
//====================================================================================
console.log("\n\n** BÚSQUEDA POR ID **");
display( [getById(4)] );



//====================================================================================
// BÚSQUEDA POR ID Y DISPONIBILIDAD
//====================================================================================
console.log("\n\n** BÚSQUEDA POR ID Y DISPONIBILIDAD **");
display( checkoutBooks('', 1, 2, 3, 99) );