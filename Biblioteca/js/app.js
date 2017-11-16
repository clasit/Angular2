var Persona = /** @class */ (function () {
    function Persona(nombre, dni) {
        this._nombre = nombre;
        this._dni = dni;
    }
    Object.defineProperty(Persona.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "dni", {
        get: function () {
            return this._dni;
        },
        enumerable: true,
        configurable: true
    });
    Persona.prototype.findById = function (dni) {
        return new Persona('', '');
    };
    return Persona;
}());
function main() {
    var personas = [];
    // let personas: Persona[] = new Array<Persona>();     // Otro método de definir un array
    for (var i = 0; i < 5; i++) {
        var p = new Persona('Name', 'DNI' + (i + 1));
        personas.push(p);
    }
    return personas;
}
var personas = main();
console.log("Tipo de bucle 1");
for (var i = 0; i < personas.length; i++) {
    console.log(personas[i].nombre);
}
console.log("\n\nTipo de bucle 2");
for (var i in personas) {
    console.log(personas[i].nombre);
}
console.log("\n\nTipo de bucle 3");
for (var _i = 0, personas_1 = personas; _i < personas_1.length; _i++) {
    var p = personas_1[_i];
    console.log(p.nombre);
}
//# sourceMappingURL=app.js.map