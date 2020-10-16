import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TestScheduler } from 'rxjs/testing';
import { Product } from '../domain/product';
import { ProductValidationService } from './product-validation.service';
import { ProductService } from './product.service';

function createNewTestScheduler() {
  return new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
}

describe('ProductValidationService', () => {
  let service: ProductValidationService;
  let productService: Partial<jasmine.SpyObj<ProductService>>;

  beforeEach(() => {
    productService = {
      getProducts: jasmine.createSpy()
    };
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: ProductService, useValue: productService }
      ]
    });
    service = TestBed.inject(ProductValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('productInUse', () => {
    const products: Product[] = [
      {id: '1', description: 'the first element', name: 'Product1', productCode: 'PRD/1'},
      {id: '2', description: 'the second element', name: 'Product2', productCode: 'PRD/2'},
      {id: '3', description: 'the third element', name: 'Product3', productCode: 'PRD/3'},
      {id: '4', description: 'the fourth element', name: 'Product4', productCode: 'PRD/4'},
    ];
    const product5: Product = {id: '5', description: 'the fifth element', name: 'Product5', productCode: 'PRD/5'};

    it('should return null if there is no value', () => {
      const control = new FormControl('');
      const testScheduler = createNewTestScheduler();
      testScheduler.run(({ cold, expectObservable, flush }) => {
        productService.getProducts.and.returnValue(cold<Product[]>('--a--', { a: products }));
        const result = service.productCodeInUse(control);
        flush();
        expectObservable(result).toBe('(n|)', {n: null});
      });
    });

    it('should return null if nothing in the first emission', () => {
      const control = new FormControl('PRD/5');
      const testScheduler = createNewTestScheduler();
      testScheduler.run(({ cold, expectObservable }) => {
        productService.getProducts.and.returnValue(cold<Product[]>('--a--b--c--', { a: [], b: products, c: products.concat(product5)}));
        const result = service.productCodeInUse(control);
        expectObservable(result).toBe('--(n|)', {n: null});
      });
    });

    xit('TODO: bonus ch10 - should return the error when a product with a different id is in the first emission', () => {
      // TODO: bonus ch10
    });

    xit('TODO: bonus ch10- should return null when the product with the same id is in the first emission', () => {
      // TODO: bonus ch10
    });
  });
});
