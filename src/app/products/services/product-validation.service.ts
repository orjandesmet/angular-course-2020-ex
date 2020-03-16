import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductValidationService {

  currentId: string;

  constructor(private productService: ProductService) { }

  productCodeInUse = (control: AbstractControl): Observable<null | { productCodeInUse: boolean }> => {
    if (!control || !control.value) {
      return of(null);
    } else {
      return this.productService.getProducts(control.value).pipe(
        map(products => products
          .filter(product => product.id !== this.currentId)
          .length > 0 ? { productCodeInUse: true } : null
        ),
        take(1)
      );
    }
  }
}
