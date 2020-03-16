import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../domain/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSandboxService {

  private productsSubject = new BehaviorSubject<Product[]>([]);
  get products$() { return this.productsSubject.asObservable(); }
  loaded = false;

  private selectedProductSubject = new BehaviorSubject<string>(null);
  get selectedProduct$() {
    return combineLatest([this.selectedProductSubject, this.products$]).pipe(
      map(([productId, products]) => products.find(product => product.id === productId))
    );
  }

  constructor(private productService: ProductService) { }

  selectProduct(productId: string) {
    this.selectedProductSubject.next(productId);
  }

  loadProducts() {
    if (this.loaded) {
      return;
    }
    this.productService.getProducts().subscribe({
      next: products => {
        this.productsSubject.next(products);
        this.loaded = true;
      }
    });
  }

  addProduct(product: Product) {
    this.productService.createProduct(product).subscribe(newProduct => {
      this.productsSubject.next(this.productsSubject.getValue().concat(newProduct));
    }, error => {
      alert(error);
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(newProduct => {
      this.productsSubject.next(this.productsSubject.getValue().map(oldProduct => oldProduct.id === product.id ? newProduct : oldProduct));
    }, error => {
      alert(error);
    });
  }

  deleteProduct(productId: string) {
      this.productService.deleteProduct(productId).subscribe(_ => {
        this.productsSubject.next(this.productsSubject.getValue().filter(product => product.id !== productId));
      }, error => {
        alert(error);
      });
  }
}
