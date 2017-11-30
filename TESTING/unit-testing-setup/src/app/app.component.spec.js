"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
// import { TestBed, inject } from '@angular/core/testing';
// Se va a utilizar la API de Jasmine para lanzar test unitarios
describe('AppComponent test', function () {
    var component;
    beforeEach(function () {
        component = new app_component_1.AppComponent();
    });
    // Prueba el valor inicial
    it('name esta inicializado con el valor Angular', function () {
        expect(component.name).toBe('Angular');
    });
    // Prueba si se puede modificar el valor
    it('name tiene el valor Angular X', function () {
        component.name = 'Angular X';
        expect(component.name).toBe('Angular X');
    });
});
//# sourceMappingURL=app.component.spec.js.map