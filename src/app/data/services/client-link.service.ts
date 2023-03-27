import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { ClientLinkDto } from '../dto';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
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
  constructor(private contextService: ViewContextService) {
    super('clientLinks');
  }

  fetchAll(): Observable<Pagination<ClientLinkDto>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => route.snapshot.parent?.params.id ?? 0),
      map(
        (clientId) =>
          new HttpParams({
            fromObject: { client_id: `${clientId}` },
          }),
      ),
      switchMap((p) => super.fetchAll(p)),
    );
  }
}
