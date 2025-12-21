import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyIcon',
  standalone: true
})
export class CurrencyIconPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'BDT': {
        return '৳'
      }
      case 'SGD': {
        return 'S$'
      }
      case 'Dollar': {
        return '$'
      }
      default: {
        return '৳'
      }
    }
  }
}

