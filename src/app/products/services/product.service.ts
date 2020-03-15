import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API_URL);
  }

  createProduct(product: Product) {
    return this.httpClient.post<Product>(this.API_URL, product);
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(`${this.API_URL}/${id}`);
  }

  updateProduct(product: Product) {
    return this.httpClient.put<Product>(`${this.API_URL}/${product.id}`, product);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
