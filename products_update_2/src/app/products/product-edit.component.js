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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/merge");
var Observable_1 = require("rxjs/Observable");
var product_service_1 = require("./product.service");
// Custom validators. Están el módulo Shared para compartir poder reutilizarlos
var number_validator_1 = require("../shared/number.validator");
var generic_validator_1 = require("../shared/generic-validator");
var ProductEditComponent = (function () {
    function ProductEditComponent(fb, // Inyecta FormBuilder para poder manipular el formulario
        route, router, productService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.productService = productService;
        // Otro ejemplo con 'ViewChild' (Toma sólo un elemento)
        // @ViewChild(StartRating) star: StarRating;
        this.pageTitle = 'Product Edit';
        // Use with the generic validation message class
        this.displayMessage = {};
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    Object.defineProperty(ProductEditComponent.prototype, "tags", {
        get: function () {
            return this.productForm.get('tags');
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Inicialzación del Formulario Reactivo
        this.productForm = this.fb.group({
            productName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)]],
            productCode: ['', forms_1.Validators.required],
            startRating: ['', [number_validator_1.NumberValidators.range(1, 5)]],
            tags: this.fb.array([]),
            description: '' // No tiene validadores, no hará falta ponerlo en forma de Array
        });
        // Read the product Id from the route parameter
        // Observación del parámetro id de la url (observable)
        // Cada vez que hay un cambio de lanza la función getProduct
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getProduct(id);
        });
    };
    ProductEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    /*
     * Ciclo de Vida de un Componente
     * Lifecycle hook that is called after a component's view has been fully initialized.
     */
    ProductEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Observar los cambios de TODOS los campos del formulario
        // map: genera un nuevo array aplicando una transformación sobre los elementos
        // Genera un array de Observable para los eventos de pérdida de foco del formulario.
        // A partir de 
        var controlBlurs = this.formInputElements.map(function (formControl) {
            // Con map genera un nuevo array transformado
            return Observable_1.Observable.fromEvent(formControl.nativeElement, 'blur');
        });
        // Concatenación de arrays
        // let array: Observable<FormControl>[] = [ this.productForm.valueChanges, ...controlBlurs ];
        // Unimos las 2 líneas de Observables.
        // También es un array de observables que escucha los cambios en el valor
        // Espera 800 ms para no saturar el formulario
        // Con merge engoblamos los 2 arrays en un obervable para poder subscribirnos
        Observable_1.Observable.merge.apply(Observable_1.Observable, [this.productForm.valueChanges].concat(controlBlurs)).debounceTime(800)
            .subscribe(function (value) { _this.displayMessage = _this.genericValidator.processMessages(_this.productForm); });
        // ------------------------------------------------------------
        // EJEMPLO DE OBSERVABLES -------------------------------------
        // ------------------------------------------------------------
        /* // (1) Crea un Observable sobre un array
            let x: Observable<number[]> = Observable.of([1, 2, 3]);
        // (2) Se subscribe a los cambios
            x.subscribe( (data) => { console.log('data', data); } );
        // (3) Al modificar el array se ejecutará la función a la que está subscrito
            x[0] = 3; */
        // ------------------------------------------------------------
    };
    ProductEditComponent.prototype.addTag = function () {
        this.tags.push(new forms_1.FormControl());
    };
    ProductEditComponent.prototype.getProduct = function (id) {
        var _this = this;
        // Cada vez que hay un cambio de ID se ejecuta esta función
        this.productService.getProduct(id)
            .subscribe(
        // Cuando me llega el producto desde el servicio se ejecutará 'onProductRetrieved'
        function (product) { return _this.onProductRetrieved(product); }, function (error) { return _this.errorMessage = error; });
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        // Borra el formulario
        this.productForm.reset();
        this.product = product;
        // Para informar al usuario si estamos en una alta o una modificación
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.productName;
        }
        // Carga el producto en el formulario
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            startRating: this.product.starRating,
            description: this.product.description
        });
        // Como es un array se tinen que hacer a parte.
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    };
    ProductEditComponent.prototype.deleteProduct = function () {
        var _this = this;
        // ¿Está en modo de alta o edición?
        if (this.product.id === 0) {
            this.onSaveComplete();
        }
        if (confirm("Seguro que quiere borrar el producto " + this.product.productName)) {
            this.productService.deleteProduct(this.product.id)
                .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
        }
    };
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        // (1) Comprobamos si hemos manipulados datos del formulario y que es válido
        if (this.productForm.dirty && this.productForm.valid) {
            // (2) Recogemos los datos del formulario
            // Pasa los parámetros del 'productForm.value' a 'this.product' y luego el resultado a {}
            // La primera parte suele ser el objeto vacío.
            // NOTA: this.product también se modifica en este por la función assign.
            var product = Object.assign({}, this.product, this.productForm.value);
            // IMPORTANTE: Si una función devulte un observable, SÓLO SE EJECUTA SI HACEMOS SUBSCRIBE
            this.productService.saveProduct(product)
                .subscribe(function () { }, function (error) { _this.errorMessage = error; });
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        // (A) Borra el formulario
        // this.productForm.reset();
        // (B) Navega a la lista de productos
        this.router.navigate(['/products']);
    };
    return ProductEditComponent;
}());
__decorate([
    core_1.ViewChildren(forms_1.FormControlName, { read: core_1.ElementRef }),
    __metadata("design:type", core_1.QueryList)
], ProductEditComponent.prototype, "formInputElements", void 0);
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/products/product-edit.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        product_service_1.ProductService])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map