import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { ClientLink } from '../models/ClientLink.model';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientLinkService extends CrudService<ClientLink> {
  constructor(protected _http: HttpClient) {
    super('clientLinks', _http);
  }

  fetchAllByClientId(clientId: number): Observable<Pagination<ClientLink>> {
    const params = new HttpParams().set('client_id', `${clientId}`);
    return super.fetchAll(params);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ClientLink>>(`${this._base}`, { params });
  }
}
