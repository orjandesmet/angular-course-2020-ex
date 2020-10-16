import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';


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
    it('should not pass the parameter and return a list of products', () => {
      // TODO: ch10 - Add this test
    });

    it('should pass the parameter and return a list of products', () => {
      // TODO: ch10 - Add this test
    });
  });
});
