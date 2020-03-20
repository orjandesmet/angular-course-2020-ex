import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientResolverService } from './client-resolver.service';


describe('ClientResolverService', () => {
  let service: ClientResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(ClientResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
