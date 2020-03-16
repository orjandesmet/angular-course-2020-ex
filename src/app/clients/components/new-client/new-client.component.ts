import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../domain/client';
import { ClientSandboxService } from '../../services/client-sandbox.service';

@Component({
  selector: 'jworks-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  constructor(
    private clientSandboxService: ClientSandboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(client: Client) {
    this.clientSandboxService.addClient(client);
    this.router.navigate(['./'], { relativeTo: this.activatedRoute.parent });
  }

}
