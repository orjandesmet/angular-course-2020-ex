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

}
