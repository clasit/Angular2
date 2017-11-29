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

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: 'app/products/product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
    /*
    Forma de tener en código algunos elementos que están en la template.
    Crea una coleccion de elementos de tipo FormControlName para poder acceder directamente
    con ese elemento en el DOM y los pondrá en un array llamado 'formInputElements' 
    de tipo genérico 'ElementRef'.
    Sólo los elementos que hayamos puesto con el atributo 'FormControlName'
    */

    //@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: QueryList<ElementRef>;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Product Edit';
    errorMessage: string;
    //TODO: form group...
    productForm: FormGroup;

    product: IProduct;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    constructor(//TODO,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
    ) {

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
        //TODO: init form builder
        // El validador de starRating es un custom validador
        this.productForm = this.fb.group({
            productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            productCode: ['',Validators.required],
            starRating: ['',[NumberValidators.range(1, 5)]],
            tags: this.fb.array([]),
            description: ''
        });

        // Read the product Id from the route parameter
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

    // Método del ciclo de vida del Angular que se ejecuta cuando se han cargado todas las vistas del componente
    ngAfterViewInit(): void {
        //TODO
        // Control de eventos 'pérdida de foco'
        // Vamos a suscribirnos a los cambios de los elementos del formulario que transformaremos con 'map'
        let controlBlurs: Observable<FormControl>[] = this.formInputElements.map(
            (formControl: ElementRef) => {
                // Nos vamos a suscribir a cada elemento que pierda el foco y lo ponemos en un array llamado controlBlurs
                return Observable.fromEvent(formControl.nativeElement, 'blur');
            }
        );

        // Array de observables de los cambios de los campos del formulario
        let array: Observable<FormControl>[] = [this.productForm.valueChanges];

        // Mezclamos los 2 observables de tiempo que ya están juntados en el array, porque tienen2 tipos de eventos diferentes
        // Esperamos 800 milisegundos entre evento y evento
        Observable.merge(array, ...controlBlurs).debounceTime(800).subscribe(
            value => {
                this.displayMessage = this.genericValidator.processMessages(this.productForm);
            }
        );

        
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    getProduct(id: number): void {
        //TODO
        this.productService.getProduct(id).subscribe(
            (product: IProduct) => {
                this.onProductRetrieved(product);
            }, (error: any) => {
                this.errorMessage = error;
                console.log('Error al recuperar el producto: ', error);
            }
        );
    }

    onProductRetrieved(product: IProduct): void {
        //TODO
        this.productForm.reset(); // Eliminamos los valores de los campos del formulario
        this.product = product;

        // Saber si estoy en alta o edición del producto
        if (this.product.id === 0) { // Alta
            this.pageTitle = 'Alta de producto';
        }else {
            this.pageTitle = 'Modificación de producto';
        }

        // Cargar los datos en el formulario
        // patchValue: Carga parcial de los elementos de un formulario
        this.productForm.patchValue({ 
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description,
        });

        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    }

    deleteProduct(): void {
        //TODO: distinguir entre altas y ediciones...
        if (this.product.id === 0) {
            this.onSaveComplete();
        }
        if (confirm(`Seguro que quiere borrar el producto ${this.product.productName}`)) {
            this.productService.deleteProduct(this.product.id).subscribe(
                () => {
                    this.onSaveComplete();
                }, (error: any) => {
                    this.errorMessage = error;
                    console.log('Error al borrar el producto: ', <any>error);
                }
            );
        };
    }

    saveProduct(): void {
        //TODO
        // Controlamos si se ha tocado algún campo del formulario
        if (this.productForm.dirty && this.productForm.valid) {
            // Recogemos el JSON de los valores del formulario
            // assign(): Va de derecha a izaquierda, almacenando los datos ->
            // this.productForm.value se asigna a la variable this.prodcut que tiene tipo IPproduct
            // y finalmente lo agregamos al objeto vacío {}

            //let product: IProduct = Object.assign({}, this.product, this.productForm.value);
            this.product = Object.assign({}, this.product, this.productForm.value);

            this.productService.saveProduct(this.product).subscribe(
                () => {
                    this.onSaveComplete();
                }, (error: any) => {
                    console.log('error: ', error);
                    this.errorMessage = error;
                }
            );
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags 
        // y se va al listado de productos
        //TODO
        this.productForm.reset();
        this.router.navigate(['/products']);
    }
}
