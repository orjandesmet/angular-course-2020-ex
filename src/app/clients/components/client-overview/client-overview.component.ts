import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Client } from '../../domain/client';
import { ClientSandboxService } from '../../services/client-sandbox.service';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { ClientFormComponent } from '../client-form/client-form.component';

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
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.clientsSandbox.loadClients();

    this.activatedRoute.queryParamMap.pipe(
      filter((paramMap) => paramMap.get('new') === 'true' || (paramMap.get('edit') === 'true' && !!paramMap.get('id'))),
      switchMap((paramMap) => this.clients$.pipe(
        map((clients) => clients.find((client) => `${client.id}` === paramMap.get('id'))),
        filter((client) => !!client || !paramMap.get('id')),
        take(1),
      )),
      switchMap((client) => {
        return this.matDialog.open(ClientFormComponent, {data: { selectedClient: client }}).afterClosed();
      }),
      tap(() => {
        this.router.navigate(['./'], { relativeTo: this.activatedRoute });
      }),
      filter((newOrUpdatedClient) => !!newOrUpdatedClient)
    ).subscribe((newOrUpdatedClient) => {
      if (newOrUpdatedClient.id) {
        this.clientsSandbox.updateClient(newOrUpdatedClient);
      } else {
        this.clientsSandbox.addClient(newOrUpdatedClient);
      }
    });

    this.activatedRoute.queryParamMap.pipe(
      filter((paramMap) => paramMap.get('id') && (paramMap.get('new') !== 'true' && paramMap.get('edit') !== 'true')),
      switchMap((paramMap) => this.clients$.pipe(
        map((clients) => clients.find((client) => `${client.id}` === paramMap.get('id'))),
        filter((client) => !!client || !paramMap.get('id')),
        take(1),
      )),
      switchMap((client) => {
        return this.matDialog.open(ClientDetailComponent, {data: { selectedClient: client }}).afterClosed();
      }),
      tap(() => {
        this.router.navigate(['./'], { relativeTo: this.activatedRoute });
      }),
    ).subscribe();
  }

  onClientSelect(client: Client) {
    this.clientsSandbox.selectClient(client.id);
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {id: client.id}});
  }

  onAdd() {
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {new: 'true'}});
  }

  onEdit(client: Client) {
    this.router.navigate(['./'], {relativeTo: this.activatedRoute, queryParams: {id: client.id, edit: 'true'}});
  }

  onDelete(client: Client) {
    // Delete the selected client
    this.clientsSandbox.deleteClient(client.id);
  }

}
