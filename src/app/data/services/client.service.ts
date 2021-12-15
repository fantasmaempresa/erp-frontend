import { Injectable } from '@angular/core';
import { Client } from '../models/Client.model';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends CrudService<Client> {
  constructor(protected _http: HttpClient) {
    super('clients', _http);
  }

  changePage(url: string) {
    return this._http.get(url);
  }
}
