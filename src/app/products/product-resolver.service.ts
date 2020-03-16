import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Product } from './domain/product';
import { ProductSandboxService } from './services/product-sandbox.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productSandboxService: ProductSandboxService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = route.paramMap.get('productId');
    if (!this.productSandboxService.loaded) {
      this.productSandboxService.loadProducts();
    }
    this.productSandboxService.selectProduct(productId);
    return this.productSandboxService.selectedProduct$.pipe(
      filter(product => !!product),
      take(1)
    );
  }
}
