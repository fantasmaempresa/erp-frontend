import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { ClientLinkDto } from '../dto';
import { Pagination } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientLinkService extends CrudService<ClientLinkDto> {
  constructor(protected _http: HttpClient) {
    super('clientLinks', _http);
  }

  fetchAllByClientId(clientId: number): Observable<Pagination<ClientLinkDto>> {
    const params = new HttpParams().set('client_id', `${clientId}`);
    return super.fetchAll(params);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ClientLinkDto>>(`${this._base}`, {
      params,
    });
  }
}
