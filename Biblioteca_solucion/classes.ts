import { Librarian, Author } from "./interfaces";


export class UniversityLibrarian implements Librarian{

    private _name;
    private _email;
    private _department;


    /*
     * Estamos obligados a definir las propiedades de la interfaz.     
     * Para reserver el encapsulado, las definimos privadas.
     * ¡PERO, usamos los 'get' y 'set' con el nombre de la propiedad!     
     */
    get department():string{
        return this._department;
    }

    get name():string{
        return this._name;
    }

    get email():string{
        return this._email;
    }


    /*
     * Implementamos la función de la interfaz.
     * Se define exáctamente con el mismo nombre.
     */
    assistCustomer(cusName:string):void{
    }
}


//---------------------------------------------------------------------------------------
// UniversityLibrarias implements Librarian
//---------------------------------------------------------------------------------------
// let bibliotecario:Librarian = new UniversityLibrarian();
// let bibliotecario:UniversityLibrarian = new UniversityLibrarian();
//---------------------------------------------------------------------------------------
