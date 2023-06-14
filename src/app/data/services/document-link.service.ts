import { Injectable } from "@angular/core";
import { DocumentDto } from "../dto";
import { HttpParams } from "@angular/common/http";
import { map, Observable, switchMap } from "rxjs";
import { CrudService, Pagination, ViewContextService } from "o2c_core";
import { ActivatedRoute } from "@angular/router";

// @Injectable({
//   providedIn: 'root',
// })
// export class DocumentLinkServiceOld extends CrudServiceOld<DocumentDto> {
//
//   constructor(protected _http: HttpClient) {
//     super('documentLink', _http);
//   }
//
//   fetchAllByClient(client_id: number): Observable<PaginationOld<DocumentDto>> {
//     const params = new HttpParams().set('client_id', `${client_id}`);
//
//     return super.fetchAll(params);
//   }
//
//   changePage(page: number, size: number) {
//     let params = new HttpParams();
//     params = params.append('page', `${page}`);
//     params = params.append('paginate', `${size}`);
//     return this._http.get<PaginationOld<DocumentDto>>(`${this._base}`, {
//       params,
//     });
//   }
// }

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

  save(t: any, params?: HttpParams): Observable<any> {
    return this._http.post<any>(this._base, t, { params });
  }
}
