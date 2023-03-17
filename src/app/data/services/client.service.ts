import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClientDto } from '../dto';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { environment } from '../../../environments/environment';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceOld extends CrudServiceOld<ClientDto> {
  constructor(protected _http: HttpClient) {
    super('clients', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<ClientDto>>(
      `${environment.base_url}/clients`,
      { params },
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientService extends CrudService<
  ClientDto,
  Pagination<ClientDto>
> {
  constructor() {
    super('clients');
  }
}
