import { Category } from './enums';



export interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
}



/*
 * De los más general. Person es extendia por Librarian y Author
 */
interface Person {
    name:string;
    email: string;
}

/*
 * A lo más particular. Extendemos persona.
 */
export interface Librarian extends Person{
    department: string;

    // "Tipo función": Es como una propiedad.
    // Función a implementar. La función es como un tipo. En que se define el parámetro de entrada y el salida.    
    // assistCustomer:(string) => void;

    assistCustomer(string):void;

    // assistCustomer:(cusName:string) => void;
}

export interface Author extends Person{
    numBooksPublished: number;
}




//=========================================================================================================
// Repaso de programación orientada a objetos
//=========================================================================================================

abstract class ReferenceItem{    
    protected data:number;
    constructor(){        
    }

    doIt(){};
}

class Magazine extends ReferenceItem{
    constructor(){
        super();
    }

    doItAgain(){
        this.data;  // Accede a la propiedad del padre
    }
}
//=========================================================================================================
