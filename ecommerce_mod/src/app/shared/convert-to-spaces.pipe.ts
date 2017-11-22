import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpaces'
})


export class ConvertToSpacesPipe implements PipeTransform {

  /*
   * La función transform indicará el tipo de cambio que se aplica sobre
   * los datos de entrada (value). Puede recibir un listado de parámetros.
   * En el template esto se invocará con: inputValue | convertToSpaces:'-'
   * 
   * IMPORTANTE: No hay que hacer operaciones muy costosas en los pipes.
   * Los pipes tienen un coste considerable, penaliza bastante la ejecución,
   * dependiendo del número de datos, operaciones que realiza el pipe y
   * número de pipes que invoquemos.
   */
  transform(value: string, character: string): any {
    return value.replace(character, ' ');
  }

}
