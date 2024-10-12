import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { map, Observable, switchMap } from 'rxjs';
import { DocumentDto } from '../dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentLinkService extends CrudService<
  DocumentDto,
  Pagination<DocumentDto>
> {
  constructor(private contextService: ViewContextService) {
    super('documentLink');
  }

  fetchAll(): Observable<Pagination<DocumentDto>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        client_id: route.snapshot.params.idIncoming ? route.snapshot.params.idIncoming : route.snapshot.parent?.params.id ?? 0,
        view: route.snapshot.data.view,
      })),
      map(
        ({ client_id, view }) =>
          new HttpParams({
            fromObject: { client_id: `${client_id}`, view: `${view}` },
          }),
      ),
      switchMap((p) => super.fetchAll(p)),
    );
  }

  save(t: any, params?: HttpParams): Observable<any> {
    return this._http.post<any>(this._base, t, { params });
  }

  delete(id: number): Observable<any> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        client_id: route.snapshot.parent?.params.id ?? 0,
        view: route.snapshot.data.view,
      })),
      map(
        ({ client_id, view }) =>
          new HttpParams({
            fromObject: { client_id: `${client_id}`, view: `${view}` },
          }),
      ),
      // @ts-ignore
      switchMap((p) => super.delete(id, p)),
    );
  }

  updateAlternative(params: any): Observable<any> {
    return this._http.post<any>(`${this._base}/updateAlternative`, params);
  }
}

@Injectable({
  providedIn: 'root',
})
export class DocumentApedixService extends CrudService<
  DocumentDto,
  Pagination<DocumentDto>
> {

  constructor(private contextService: ViewContextService) {
    super('');
  }
  override fetchAll(): Observable<Pagination<DocumentDto>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => route.snapshot.params.id ?? 0),
      map(
        (procedureid) =>
          new HttpParams({
            fromObject: { procedure_id: `${procedureid}` },
          }),
      ),
      switchMap((p) => this._http.get<Pagination<DocumentDto>>(`${environment.base_url}/documentLink/filter/getAppendix`, { params: p })),
    );
  }
}


@Injectable({
  providedIn: 'root',
})
export class DocumentLinkPhaseService extends CrudService<
  DocumentDto,
  Pagination<DocumentDto>
> {
  constructor(private contextService: ViewContextService) {
    super('documentLink');
  }

  fetchAll(): Observable<Pagination<DocumentDto>> {
    return this.contextService.injector$.pipe(
      map(() => {
        const client_id = localStorage.getItem('phase_procedure_id') ?? 0;
        return new HttpParams({
          fromObject: { client_id: `${client_id}`, view: `procedures` },
        });
      }),
      switchMap((p) => super.fetchAll(p)),
    );
  }

  save(t: any, params?: HttpParams): Observable<any> {
    return this._http.post<any>(this._base, t, { params });
  }

  delete(id: number): Observable<any> {
    return this.contextService.injector$.pipe(
      map(() => {
        const client_id = localStorage.getItem('phase_procedure_id') ?? 0;
        return new HttpParams({
          fromObject: { client_id: `${client_id}`, view: `procedures` },
        });
      }
      ),
      // @ts-ignore
      switchMap((p) => super.delete(id, p)),
    );
  }

  updateAlternative(params: any): Observable<any> {
    return this._http.post<any>(`${this._base}/updateAlternative`, params);
  }
}