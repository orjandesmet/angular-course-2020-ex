import { Component, OnInit } from '@angular/core';
import { Client } from '../../domain/client';
import { ClientSandboxService } from '../../services/client-sandbox.service';

@Component({
  selector: 'jworks-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  clients$ = this.clientsSandbox.clients$;

  constructor(private clientsSandbox: ClientSandboxService) { }

  ngOnInit(): void {
    this.clientsSandbox.loadClients();
  }

  onClientSelect(client: Client) {
    this.clientsSandbox.selectClient(client.id);
  }

}
