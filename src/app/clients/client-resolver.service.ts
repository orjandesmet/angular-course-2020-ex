import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Client } from './domain/client';
import { ClientSandboxService } from './services/client-sandbox.service';

@Injectable({
  providedIn: 'root'
})
export class ClientResolverService implements Resolve<Client> {

  constructor(private clientSandboxService: ClientSandboxService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
    const clientId = route.paramMap.get('clientId');
    if (!this.clientSandboxService.loaded) {
      this.clientSandboxService.loadClients();
    }
    this.clientSandboxService.selectClient(parseInt(clientId, 10));
    return this.clientSandboxService.selectedClient$.pipe(
      filter(client => !!client),
      take(1)
    );
  }
}
