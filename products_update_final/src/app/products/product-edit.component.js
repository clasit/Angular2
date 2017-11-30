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
require("rxjs/add/operator/delay");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/merge");
var Observable_1 = require("rxjs/Observable");
var product_service_1 = require("./product.service");
var number_validator_1 = require("../shared/number.validator");
var generic_validator_1 = require("../shared/generic-validator");
var ProductEditComponent = (function () {
    function ProductEditComponent(fb, route, router, productService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.productService = productService;
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
        //TODO: init form builder
        this.productForm = this.fb.group({
            productName: ['', [
                    forms_1.Validators.required
                ]],
            productCode: ['', forms_1.Validators.required],
            starRating: ['', number_validator_1.NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });
        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getProduct(id);
        });
    };
    ProductEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductEditComponent.prototype.ngAfterViewInit = function () {
        //TODO
        //control de eventos 'perdida de foco'
        var _this = this;
        console.log('this.formInputElements:' + this.formInputElements.length);
        var controlBlurs = this.formInputElements.map(function (formControl) {
            return Observable_1.Observable.fromEvent(formControl.nativeElement, 'blur');
        });
        Observable_1.Observable.merge.apply(Observable_1.Observable, [this.productForm.valueChanges].concat(controlBlurs)).debounceTime(800)
            .subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.productForm);
        });
    };
    ProductEditComponent.prototype.addTag = function () {
        this.tags.push(new forms_1.FormControl());
    };
    ProductEditComponent.prototype.getProduct = function (id) {
        var _this = this;
        //TODO
        this.productService.getProduct(id)
            .subscribe(function (product) {
            _this.onProductRetrieved(product);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        //TODO
        this.productForm.reset();
        this.product = product;
        //saber si estoy en un alta o en edicion
        if (this.product.id === 0) {
            this.pageTitle = 'Alta producto';
        }
        else {
            this.pageTitle = 'Modificación producto';
        }
        //cargar la info en formulario
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description,
        });
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    };
    ProductEditComponent.prototype.deleteProduct = function () {
        var _this = this;
        //TODO: distinguir entre altas y ediciones...
        if (this.product.id === 0) {
            this.onSaveComplete();
        }
        else {
            if (confirm("\u00BFSeguro que quiere borrar el producto " + this.product.productName + "?")) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(function () {
                    _this.onSaveComplete();
                }, function (error) {
                    _this.errorMessage = error;
                });
            }
        }
    };
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        //TODO
        if (this.productForm.dirty && this.productForm.valid) {
            var product = Object.assign({}, this.product, this.productForm.value);
            this.productService.saveProduct(product)
                .subscribe(function () {
                _this.onSaveComplete();
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        //TODO
        this.productForm.reset();
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