import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../domain/client';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientSandboxService {

  private clientsSubject = new BehaviorSubject<Client[]>([]);
  get clients$() { return this.clientsSubject.asObservable(); }
  loaded = false;

  private selectedClientSubject = new BehaviorSubject<number>(null);
  get selectedClient$() {
    return combineLatest([this.selectedClientSubject, this.clients$]).pipe(
      map(([clientId, clients]) => clients.find(client => client.id === clientId))
    );
  }

  constructor(private clientService: ClientService) { }

  selectClient(clientId: number) {
    this.selectedClientSubject.next(clientId);
  }

  loadClients() {
    if (this.loaded) {
      return;
    }
    this.clientService.getClients().subscribe({
      next: clients => {
        this.clientsSubject.next(clients);
        this.loaded = true;
      }
    });
  }

  addClient(client: Client) {
    this.clientService.createClient(client).subscribe(newClient => {
      this.clientsSubject.next(this.clientsSubject.getValue().concat(newClient));
    }, error => {
      alert(error);
    });
  }

  updateClient(client: Client) {
    this.clientService.updateClient(client).subscribe(newClient => {
      this.clientsSubject.next(this.clientsSubject.getValue().map(oldClient => oldClient.id === client.id ? newClient : oldClient));
    }, error => {
      alert(error);
    });
  }

  deleteClient(clientId: number) {
      this.clientService.deleteClient(clientId).subscribe(_ => {
        this.clientsSubject.next(this.clientsSubject.getValue().filter(client => client.id !== clientId));
      }, error => {
        alert(error);
      });
  }
}
