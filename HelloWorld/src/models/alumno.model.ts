
export class Alumno{

    // Atributos
    private _nombre:string;
    private _edad:number;
    private _curso:string;

    // Métodos

    constructor(nombre:string, edad:number, curso:string){
        this._nombre = nombre;
        this._edad = edad;
        this._curso = curso;
    }


    // Getters -------------------------------------------
    get nombre():string{
        return this._nombre;
    }

    get edad():number{
        return this._edad;
    }

    get curso():string{
        return this._curso;
    }
    //----------------------------------------------------
}