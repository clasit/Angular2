import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanDeactivate } from '@angular/router/src/interfaces';
import { ProductEditComponent } from './product-edit.component';


@Injectable()
export class ProductDetailGuard implements CanActivate {
    
    constructor(private router:Router){}
    
    canActivate(route: ActivatedRouteSnapshot): boolean {
        //localhost:4200/products/1
        let id:number = +route.url[1].path;

        if (isNaN(id) || id < 1){
            alert('Id inválido');
            this.router.navigate(['/products']);

            return false;
        }
        return true;
    }

} 

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    
    canDeactivate(component: ProductEditComponent): boolean {
        /* 
        avisar al usuario al salir del formulario de edición 
        habiendo hecho cambios sin haber guardado    
        */
        if (component.productForm.dirty){
            let productName = component.productForm.get('productName').value;
            return confirm(`¿Está seguro de abandonar la edición del producto ${productName}?`);
        }
        return true;

    }
    
}