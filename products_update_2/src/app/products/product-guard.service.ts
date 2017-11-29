import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';


/* 
 * GUARD: Protección de entrada y salida
 * Proceso prerouting, al implementar 'CanActivate' significa que se ejecutara 
 * antes de ejecutar el routing de navegación.
 */

@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // localhost:4200/products/1
        let id = +route.url[1].path; 
        // Tomamos el 2º segmento de la URL la id
        // [0] - products
        // [1] - id

        if ( isNaN(id) || id < 1 ) {
            alert('Id inválido');
            this.router.navigate(['/router']);

            // Se abortará la navegación
            return false;
        }

        // Continua la navegación normal
        return true;
    }
};



@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    canDeactivate(component: ProductEditComponent): boolean {
        /*  Avisa al usuario antes de salir del formulario de edición si hay
            cambios sin guardar.
        */

        // Compreba si alguno de sus estados fue modificado
        if ( component.productForm.dirty ) {
            let productName = component.productForm.get('productName').value;
            return confirm(`¿Está seguro de abandonar esta edición del producto ${productName}?`);
        }
        return true;
    }
}
