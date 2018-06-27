import { Pipe, PipeTransform } from '@angular/core';
import { MathCalc } from './mathService';

@Pipe({
    name: 'capitalLetter',
    pure: false
})

/* better name readableDigitFormat, could add an argument determining the separater sign */

export class CapitalLetter implements PipeTransform {

    transform(value: string, ...arg: any[]) {

        if (typeof value === 'string' && value && value.length > 0) {

          return `${value[0].toLocaleUpperCase()}${value.slice(1)}`;

        } else {

            return value;

        }

    }
}
