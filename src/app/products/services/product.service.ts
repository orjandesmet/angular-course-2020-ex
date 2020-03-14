import { Injectable } from '@angular/core';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return [
      { id: 'J01', name: 'My Product', description: 'My first product', productCode: 'jworks-0001'},
      { id: 'J02', name: 'Tim\'s Product', description: 'Tim his first product', productCode: 'jworks-0002'}
    ];
  }
}
