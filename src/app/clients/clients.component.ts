import { Component, OnInit } from '@angular/core';
import { Client } from './domain/client';

@Component({
  selector: 'jworks-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  data: Client[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
