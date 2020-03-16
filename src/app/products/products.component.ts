import { Component, OnInit } from '@angular/core';
import { Product } from './domain/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'jworks-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public data: Product[] = [];

  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.data = products;
    });
  }

  onFormSubmit(product: Product) {
    if (!product.id) {
      this.productService.createProduct(product).subscribe(newProduct => {
        this.data = this.data.concat(newProduct);
      }, error => {
        alert(error);
      });
    } else {
      this.productService.updateProduct(product).subscribe(newProduct => {
        this.data = this.data.map(oldProduct => oldProduct.id === product.id ? newProduct : oldProduct);
      }, error => {
        alert(error);
      });
    }
  }

  onDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(_ => {
      this.data = this.data.filter(product => product.id !== productId);
    }, error => {
      alert(error);
    });
  }

}
