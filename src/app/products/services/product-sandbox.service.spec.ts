import { TestBed } from '@angular/core/testing';

import { ProductSandboxService } from './product-sandbox.service';

describe('ProductSandboxService', () => {
  let service: ProductSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
