import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductSandboxService } from '../../services/product-sandbox.service';

@Component({
  selector: 'jworks-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(private productSandboxService: ProductSandboxService) { }

  ngOnInit(): void {
  }

  onFormSubmit(product: Product) {
    this.productSandboxService.addProduct(product);
  }

}
