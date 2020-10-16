import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { Product } from '../domain/product';
import { ProductService } from './product.service';

function createNewTestScheduler() {
  return new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
}

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    const products: Product[] = [
      {id: '1', name: 'Product1', description: '', productCode: 'P1'},
      {id: '2', name: 'Product2', description: '', productCode: 'P2'},
    ];
    it('should not pass the parameter and return a list of products', () => {
      const testScheduler = createNewTestScheduler();
      const httpClient = TestBed.inject(HttpClient);
      testScheduler.run(({cold, expectObservable}) => {
        const getSpy = spyOn(httpClient, 'get');
        getSpy.and.returnValue(cold('---(p|)', {p: products}));
        expectObservable(service.getProducts()).toBe('---(p|)', {p: products});
        expect(getSpy).toHaveBeenCalledWith(service.API_URL, {params: new HttpParams()});
      });
    });

    it('should pass the parameter and return a list of products', () => {
      const testScheduler = createNewTestScheduler();
      const httpClient = TestBed.inject(HttpClient);
      testScheduler.run(({cold, expectObservable}) => {
        const getSpy = spyOn(httpClient, 'get');
        getSpy.and.returnValue(cold('---(p|)', {p: products.slice(1)}));
        expectObservable(service.getProducts('P1')).toBe('---(p|)', {p: products.slice(1)});
        expect(getSpy).toHaveBeenCalledWith(service.API_URL, {params: new HttpParams().set('productCode', 'P1')});
      });
    });
  });
});
