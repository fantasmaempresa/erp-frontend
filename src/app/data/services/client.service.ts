import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../models/Pagination.model';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  endpoint = `${environment.base_url}/clients`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<Client>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<Client>(`${this.endpoint}/${id}`);
  }

  create(client: Client) {
    return this.http.post<Client>(`${this.endpoint}`, client);
  }

  update(client: Client) {
    let { id } = client;
    return this.http.put<Client>(`${this.endpoint}/${id}`, client);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
