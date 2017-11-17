class Persona {
    get nombre() {
        return this._nombre;
    }
    get dni() {
        return this._dni;
    }
    constructor(nom, dni) {
        this._nombre = nom;
        this._dni = dni;
    }
    findById(d) {
        return new Persona('', '');
    }
}
function main() {
    //inicializar 5 personas
    for (let i = 0; i < 5; i++) {
        let p = new Persona('Name', '1');
        personas.push(p);
    }
}
function viewInfo() {
    for (let indx in personas) {
        console.log(`Indice:${indx}`);
    }
}
let personas = [];
main();
viewInfo();
