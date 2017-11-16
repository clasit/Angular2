
class Persona{
    private _nombre: string;
    private _dni: string;

    
    constructor(nombre:string, dni:string){
        this._nombre = nombre;
        this._dni = dni;
    }

    public get nombre(): string{
        return this._nombre;
    }

    public get dni(): string{
        return this._dni;
    }

    public findById(dni:string): Persona{
        return new Persona('', '');
    }
}



function main(){    
    let personas: Array<Persona> = [];
    // let personas: Persona[] = new Array<Persona>();     // Otro método de definir un array

    for(let i=0; i<5; i++){        
        let p = new Persona('Name', 'DNI'+(i+1));
        personas.push(p);
    }

    return personas;
}




let personas:Persona[] = main();


console.log("Tipo de bucle 1");
for(let i=0; i<personas.length; i++){
    console.log( personas[i].nombre );
}



console.log("\n\nTipo de bucle 2");
for(let i in personas){
    console.log( personas[i].nombre );
}


console.log("\n\nTipo de bucle 3");
for(let p of personas){
    console.log( p.nombre );
}