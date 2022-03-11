import { Injectable } from '@angular/core';
import { Client } from '../models/Client.model';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends CrudService<Client> {
  constructor(protected _http: HttpClient) {
    super('clients', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<Client>>(`${environment.base_url}/clients`, { params });
  }
}
