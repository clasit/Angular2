"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
// EJECUCIÓN DEL TEST UNITARIO: "npm run test"
// Se va a utilizar la API de Jasmine para lanzar test unitarios
describe('AppComponent test', function () {
    var component;
    // Se hace una instancia por cada componente
    // Cada test (it) tiene su propio objeto
    beforeEach(function () {
        component = new app_component_1.AppComponent();
    });
    // Prueba el valor inicial
    it('name esta inicializado con el valor Angular', function () {
        // toBe es el 'matcher'
        expect(component.name).toBe('Angular');
    });
    // Prueba si se puede modificar el valor
    it('name tiene el valor Angular X', function () {
        component.name = 'Angular X';
        expect(component.name).toBe('Angular X');
    });
    // Se podría poner otro describe
    describe('', function () { });
});
//# sourceMappingURL=app.component.spec.js.map