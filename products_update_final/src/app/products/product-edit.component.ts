import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
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
    @ViewChildren(FormControlName, { read: ElementRef }) 
    formInputElements:  QueryList<ElementRef>;
    

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

    constructor(private fb:FormBuilder,
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
        //TODO: init form builder
        this.productForm = this.fb.group({
            productName:['',[
                Validators.required
            ]],
            productCode: ['',Validators.required],
            starRating: ['', NumberValidators.range(1,5)],
            tags:this.fb.array([]),
            description:''
        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            (params:any[]) => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        //TODO
        //control de eventos 'perdida de foco'
        
        console.log('this.formInputElements:' + this.formInputElements.length);

        let controlBlurs:Observable<any>[] = this.formInputElements.map((formControl:ElementRef) => {
            return Observable.fromEvent(formControl.nativeElement,'blur');
        });

        Observable.merge(this.productForm.valueChanges,...controlBlurs)
            .debounceTime(800)
            .subscribe((value:any) => {
            this.displayMessage = this.genericValidator.processMessages(this.productForm);
        });
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    getProduct(id: number): void {
        //TODO
        this.productService.getProduct(id)
            .subscribe((product:IProduct) => {
                this.onProductRetrieved(product);
            }, (error:any) => {
                this.errorMessage = error;
            })
    }

    onProductRetrieved(product: IProduct): void {
        //TODO
        this.productForm.reset();

        this.product = product;

        //saber si estoy en un alta o en edicion
        if (this.product.id === 0){ //alta
            this.pageTitle = 'Alta producto';
        } else {
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
    }

    deleteProduct(): void { 
        //TODO: distinguir entre altas y ediciones...
        if (this.product.id === 0){
            this.onSaveComplete();
        } else {
            if (confirm(`¿Seguro que quiere borrar el producto ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                .subscribe(() => {
                    this.onSaveComplete();
                }, (error:any) => {
                    this.errorMessage = <any>error;
                });
            }
        } 
        
        
    }

    saveProduct(): void {
        //TODO
        if (this.productForm.dirty && this.productForm.valid){
            let product = Object.assign({},this.product,this.productForm.value);

            this.productService.saveProduct(product)
                .subscribe(() => {
                    this.onSaveComplete();
                }, (error:any) => {
                    this.errorMessage = error;
                })
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        //TODO
        this.productForm.reset();
        this.router.navigate(['/products']);
    }
}
