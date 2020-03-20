import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ProductValidationService } from './product-validation.service';


describe('ProductValidationService', () => {
  let service: ProductValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should return null if product code is not in use', done => {
    const control = new FormControl('my-product');
    service.productCodeInUse(control).subscribe(value => {
      expect(value).toBeNull();
      done();
    });
    expect(true).toBeTruthy();
  });
});
