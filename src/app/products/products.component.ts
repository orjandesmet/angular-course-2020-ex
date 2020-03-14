import { Component, OnInit } from '@angular/core';
import { Product } from './domain/product';

@Component({
  selector: 'jworks-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public data: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
