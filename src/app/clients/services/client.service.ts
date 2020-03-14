import { Injectable } from '@angular/core';
import { Client } from '../domain/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Client[] {
    return [{
      id: 327,
      firstName: 'Bobby',
      lastName: 'Tables',
      birthday: '10/10/2007',
      city: '',
      email: 'bobby.tables@xkcs.com',
      zip: '',
    }]
  }
}
