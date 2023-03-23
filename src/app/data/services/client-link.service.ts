import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { ClientLinkDto } from '../dto';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { CrudService, Pagination } from 'o2c_core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientLinkServiceOld extends CrudServiceOld<ClientLinkDto> {
  constructor(protected _http: HttpClient) {
    super('clientLinks', _http);
  }

  fetchAllByClientId(
    clientId: number,
  ): Observable<PaginationOld<ClientLinkDto>> {
    const params = new HttpParams().set('client_id', `${clientId}`);
    return super.fetchAll(params);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<ClientLinkDto>>(`${this._base}`, {
      params,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientLinkService extends CrudService<
  ClientLinkDto,
  Pagination<ClientLinkDto>
> {
  constructor(protected route: ActivatedRoute) {
    super('clientLinks');
  }

  fetchAll(params?: HttpParams): Observable<Pagination<ClientLinkDto>> {
    const activatedRouteSnapshot = this.route.snapshot;
    console.log(activatedRouteSnapshot);
    const clientId = activatedRouteSnapshot.parent?.params.id ?? 0;

    params = new HttpParams({
      fromObject: { client_id: `${clientId}` },
    });
    return super.fetchAll(params);
  }
}
