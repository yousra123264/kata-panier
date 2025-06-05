import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/features/products/models/product.model';
import { calculateTaxes } from '../utils/tax.utils';

@Pipe({
  name: 'prixTtc',
  standalone: true  
})
export class PrixTtcPipe implements PipeTransform {
  transform(product: Product): number {
    const taxes = calculateTaxes(product);
    return +(product.price + taxes).toFixed(2);
  }
}
