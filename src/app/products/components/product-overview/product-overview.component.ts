import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';

@Component({
  selector: 'jworks-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  products$ = this.productsSandbox.products$;

  constructor(private productsSandbox: ProductSandboxService) { }

  ngOnInit(): void {
    this.productsSandbox.loadProducts();
  }

  onProductSelect(product: Product) {
    this.productsSandbox.selectProduct(product.id);
  }

}
