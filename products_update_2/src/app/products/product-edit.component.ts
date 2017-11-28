import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

// Custom validators. Están el módulo Shared para compartir poder reutilizarlos
import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { error } from 'util';


@Component({
    templateUrl: 'app/products/product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {

/*--------------------------------------------------------------------------------------
 * @ViewChildren. No tiene que ver con el formulario, sirve para tener acceso a los
 * elemtos que se tienen en la template.
 * Pone todos los elemento que tienen el 'FormControlName' en un array de elementos llamado 
 * 'formInputElements'. Es como hacer una query en el DOM.
 *-------------------------------------------------------------------------------------*/
    @ViewChildren(FormControlName, { read: ElementRef }) 
    formInputElements: QueryList<ElementRef>;

    // Otro ejemplo con 'ViewChild' (Toma sólo un elemento)
    // @ViewChild(StartRating) star: StarRating;

    pageTitle: string = 'Product Edit';
    errorMessage: string;

    // Declaración del formulario 'reactivo'. Esta variable representa el formulario.
    productForm: FormGroup;

/*--------------------------------------------------------------------------------------
 * FormBuilder: No es obligatiorio para los formularios reactivos, pero si recomendable.
 * FormGroup: El formulario.
 * FormControl: Campos del formulario.
 * FormArray: Campos del formulario en formato array.
 * Validators: Validación del formulario.
 * FormControlName: Vinculación por nombre del campo del formulario
 *------------------------------------------------------------------------------------*/

    product: IProduct;
    private sub: Subscription;


    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;


    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }


    constructor(private fb: FormBuilder,   // Inyecta FormBuilder para poder manipular el formulario
                private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {

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
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {

        // Inicialzación del Formulario Reactivo
        this.productForm = this.fb.group({
            productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            startRating: ['', [NumberValidators.range(1, 5)]],
            tags: this.fb.array([]),
            description: '' // No tiene validadores, no hará falta ponerlo en forma de Array
        });

        // Read the product Id from the route parameter
        // Observación del parámetro id de la url (observable)
        // Cada vez que hay un cambio de lanza la función getProduct
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


    /* 
     * Ciclo de Vida de un Componente
     * Lifecycle hook that is called after a component's view has been fully initialized.
     */
    ngAfterViewInit(): void {

        // Observar los cambios de TODOS los campos del formulario
        // map: genera un nuevo array aplicando una transformación sobre los elementos
        // Genera un array de Observable para los eventos de pérdida de foco del formulario.
        // A partir de 
        let controlBlurs: Observable<FormControl>[] = this.formInputElements.map(
            (formControl: ElementRef) => {
                // Con map genera un nuevo array transformado
                return Observable.fromEvent(formControl.nativeElement, 'blur');
            });

        // Concatenación de arrays
        // let array: Observable<FormControl>[] = [ this.productForm.valueChanges, ...controlBlurs ];

        // Unimos las 2 líneas de Observables.
        // También es un array de observables que escucha los cambios en el valor
        // Espera 800 ms para no saturar el formulario
        // Con merge engoblamos los 2 arrays en un obervable para poder subscribirnos
        Observable.merge( this.productForm.valueChanges, ...controlBlurs ).debounceTime(800)
            .subscribe(
                (value) => { this.displayMessage = this.genericValidator.processMessages(this.productForm); }
        );


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
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    getProduct(id: number): void {
        // Cada vez que hay un cambio de ID se ejecuta esta función
        this.productService.getProduct(id)
        .subscribe(
            // Cuando me llega el producto desde el servicio se ejecutará 'onProductRetrieved'
            (product: IProduct) => this.onProductRetrieved(product),
            (error: any) => this.errorMessage = <any>error
        );
    }

    onProductRetrieved(product: IProduct): void {
        // Borra el formulario
        this.productForm.reset();

        this.product = product;

        // Para informar al usuario si estamos en una alta o una modificación
        if (this.product.id === 0) {    // ALTA
            this.pageTitle = 'Add Product';
        } else {                        // MODIFICACIÓN
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }

        // Carga el producto en el formulario
        this.productForm.patchValue({   // No se usa 'setValue' por que no se utilizarn todos los campo. Falta tags.
            productName: this.product.productName,
            productCode: this.product.productCode,
            startRating: this.product.starRating,
            description: this.product.description
        });

        // Como es un array se tinen que hacer a parte.
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    }

    deleteProduct(): void {

        // ¿Está en modo de alta o edición?
        if ( this.product.id === 0 ) {
            this.onSaveComplete();
        }

        if ( confirm(`Seguro que quiere borrar el producto ${this.product.productName}`) ) {
            this.productService.deleteProduct( this.product.id )
                .subscribe(
                    () => this.onSaveComplete(),
                    error => this.errorMessage = error
                );
        }
    }

    saveProduct(): void {
        // (1) Comprobamos si hemos manipulados datos del formulario y que es válido
        if ( this.productForm.dirty && this.productForm.valid ) {

            // (2) Recogemos los datos del formulario
            // Pasa los parámetros del 'productForm.value' a 'this.product' y luego el resultado a {}
            // La primera parte suele ser el objeto vacío.
            // NOTA: this.product también se modifica en este por la función assign.
            let product = Object.assign({}, this.product, this.productForm.value);

            // IMPORTANTE: Si una función devulte un observable, SÓLO SE EJECUTA SI HACEMOS SUBSCRIBE
            this.productService.saveProduct(product)
                .subscribe(
                    () => {},
                    (error) => { this.errorMessage = error; }
                );
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags

        // (A) Borra el formulario
        // this.productForm.reset();

        // (B) Navega a la lista de productos
        this.router.navigate(['/products']);
    }
}
