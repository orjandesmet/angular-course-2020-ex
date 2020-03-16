import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';

@Component({
  selector: 'jworks-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct$ = this.productSandboxService.selectedProduct$;

  constructor(private productSandboxService: ProductSandboxService) { }

  ngOnInit(): void {
  }

  onDeleteProduct(productId: string) {
    this.productSandboxService.deleteProduct(productId);
  }

  onFormSubmit(product: Product) {
    if (product.id) {
      this.productSandboxService.updateProduct(product);
    } else {
      this.productSandboxService.addProduct(product);
    }
  }

}
