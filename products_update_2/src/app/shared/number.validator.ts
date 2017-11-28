import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Validator } from '@angular/forms/src/directives/validators';

export class NumberValidators {

    // Null  : significa que ha validado
    // !Null : significa que no ha validado

    static range(min: number, max: number): ValidatorFn {
        return (c: AbstractControl):
            {[key: string]: boolean} | null => {
                if ( c.value && (isNaN(c.value) || c.value < min || c.value > max) ) {
                    return {'range': true};
                }
            };
        }
}
