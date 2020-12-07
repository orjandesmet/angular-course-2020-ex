import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../domain/client';
import { ClientSandboxService } from '../../services/client-sandbox.service';

@Component({
  selector: 'jworks-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  clients$ = this.clientsSandbox.clients$;

  constructor(
    private clientsSandbox: ClientSandboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientsSandbox.loadClients();
  }

  onClientSelect(client: Client) {
    this.clientsSandbox.selectClient(client.id);
    this.router.navigate(['./', client.id], { relativeTo: this.activatedRoute.parent });
  }

  onAdd() {
    // Add a client here
  }

  onEdit(client: Client) {
    // Open the dialog for edit
    console.log(client);
  }

  onDelete(client: Client) {
    // Delete the selected client
    this.clientsSandbox.deleteClient(client.id);
  }

}
