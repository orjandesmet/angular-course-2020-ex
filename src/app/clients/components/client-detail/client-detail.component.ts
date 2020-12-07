import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../domain/client';

@Component({
  selector: 'jworks-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnInit {

  client: Client;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { selectedClient: Client }) { }

  ngOnInit(): void {
    if (this.data?.selectedClient) {
      this.client = this.data.selectedClient;
    }
  }
}
