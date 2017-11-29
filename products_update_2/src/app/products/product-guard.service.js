"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
/*
 * GUARD: Protección de entrada y salida
 * Proceso prerouting, al implementar 'CanActivate' significa que se ejecutara
 * antes de ejecutar el routing de navegación.
 */
var ProductDetailGuard = (function () {
    function ProductDetailGuard(router) {
        this.router = router;
    }
    ProductDetailGuard.prototype.canActivate = function (route) {
        // localhost:4200/products/1
        var id = +route.url[1].path;
        // Tomamos el 2º segmento de la URL la id
        // [0] - products
        // [1] - id
        if (isNaN(id) || id < 1) {
            alert('Id inválido');
            this.router.navigate(['/router']);
            // Se abortará la navegación
            return false;
        }
        // Continua la navegación normal
        return true;
    };
    return ProductDetailGuard;
}());
ProductDetailGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], ProductDetailGuard);
exports.ProductDetailGuard = ProductDetailGuard;
;
var ProductEditGuard = (function () {
    function ProductEditGuard() {
    }
    ProductEditGuard.prototype.canDeactivate = function (component) {
        /*  Avisa al usuario antes de salir del formulario de edición si hay
            cambios sin guardar.
        */
        // Compreba si alguno de sus estados fue modificado
        if (component.productForm.dirty) {
            var productName = component.productForm.get('productName').value;
            return confirm("\u00BFEst\u00E1 seguro de abandonar esta edici\u00F3n del producto " + productName + "?");
        }
        return true;
    };
    return ProductEditGuard;
}());
ProductEditGuard = __decorate([
    core_1.Injectable()
], ProductEditGuard);
exports.ProductEditGuard = ProductEditGuard;
//# sourceMappingURL=product-guard.service.js.map