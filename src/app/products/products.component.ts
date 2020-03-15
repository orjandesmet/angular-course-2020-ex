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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.data = products;
    });
  }

}
