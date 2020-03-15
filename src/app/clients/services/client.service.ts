import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../domain/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  API_URL = 'http://localhost:8080/clients';

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.API_URL);
  }

  createClient(client: Client) {
    return this.httpClient.post<Client>(this.API_URL, client);
  }

  getClient(id: number) {
    return this.httpClient.get<Client>(`${this.API_URL}/${id}`);
  }

  updateClient(client: Client) {
    return this.httpClient.put<Client>(`${this.API_URL}/${client.id}`, client);
  }

  deleteClient(id: number) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
