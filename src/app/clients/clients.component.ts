import { Component, OnInit } from '@angular/core';
import { Client } from './domain/client';
import { ClientService } from './services/client.service';

@Component({
  selector: 'jworks-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  data: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.data = clients;
    });
  }

  onFormSubmit(client: Client) {
    if (!client.id) {
      this.clientService.createClient(client).subscribe(newClient => {
        this.data = this.data.concat(newClient);
      }, error => {
        alert(error);
      });
    } else {
      this.clientService.updateClient(client).subscribe(newClient => {
        this.data = this.data.map(oldClient => oldClient.id === client.id ? newClient : oldClient);
      }, error => {
        alert(error);
      });
    }
  }

  onDeleteClient(clientId: number) {
    this.clientService.deleteClient(clientId).subscribe(_ => {
      this.data = this.data.filter(client => client.id !== clientId);
    }, error => {
      alert(error);
    });
  }

}
