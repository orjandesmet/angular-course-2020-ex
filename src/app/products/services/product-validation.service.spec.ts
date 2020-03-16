import { TestBed } from '@angular/core/testing';

import { ProductValidationService } from './product-validation.service';

describe('ProductValidationService', () => {
  let service: ProductValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
