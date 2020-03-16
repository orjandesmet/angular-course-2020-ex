import { TestBed } from '@angular/core/testing';

import { ClientSandboxService } from './client-sandbox.service';

describe('ClientSandboxService', () => {
  let service: ClientSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
