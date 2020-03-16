import { TestBed } from '@angular/core/testing';

import { ClientResolverService } from './client-resolver.service';

describe('ClientResolverService', () => {
  let service: ClientResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
