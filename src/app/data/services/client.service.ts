import { Injectable } from '@angular/core';
import { ClientDto } from '../dto/Client.dto';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends CrudService<ClientDto> {
  constructor(protected _http: HttpClient) {
    super('clients', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ClientDto>>(`${environment.base_url}/clients`, { params });
  }
}
