// join-skus.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinSkus', standalone: true })
export class JoinSkusPipe implements PipeTransform {
  transform(items: any[] | null | undefined, sep = ', '): string {
    if (!Array.isArray(items) || !items.length) return '-';
    const skus = items
      .map(i => i?.variation?.sku ?? i?.sku ?? '')
      .filter(Boolean);
    // unique + join
    return [...new Set(skus)].join(sep) || '-';
  }
}
