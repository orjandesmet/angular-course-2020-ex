import { Component, OnInit } from '@angular/core';
import { Client } from '../../domain/client';
import { ClientSandboxService } from '../../services/client-sandbox.service';

@Component({
  selector: 'jworks-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  selectedClient$ = this.clientSandboxService.selectedClient$;

  constructor(private clientSandboxService: ClientSandboxService) { }

  ngOnInit(): void {
  }

  onDeleteClient(clientId: number) {
    this.clientSandboxService.deleteClient(clientId);
  }

  onFormSubmit(client: Client) {
    if (client.id) {
      this.clientSandboxService.updateClient(client);
    } else {
      this.clientSandboxService.addClient(client);
    }
  }

}
