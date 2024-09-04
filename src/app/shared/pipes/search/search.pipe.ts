import { Product } from './../../interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(productList: Product[], word: string): Product[] {
    return productList.filter((prod) =>
      prod.title.toLowerCase().includes(word.toLowerCase())
    );
  }
}
