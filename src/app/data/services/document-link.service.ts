import { Injectable } from "@angular/core";
import { DocumentDto } from "../dto";
import { HttpParams } from "@angular/common/http";
import { filter, map, Observable, pluck, switchMap } from "rxjs";
import { CrudService, Pagination, ViewContextService } from "o2c_core";
import { ActivatedRoute, ActivationEnd, Router, RouterEvent } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DocumentLinkService extends CrudService<
  DocumentDto,
  Pagination<DocumentDto>
> {
  constructor(private contextService: ViewContextService) {
    super("documentLink");
  }

  fetchAll(): Observable<Pagination<DocumentDto>> {

    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        client_id: route.snapshot.parent?.params.id ?? 0,
        view: route.snapshot.data.view,
      })),
      map(
        ({ client_id, view }) =>
          new HttpParams({
            fromObject: { client_id: `${client_id}`, view: `${view}`}
          })
      ),
      switchMap((p) => super.fetchAll(p))
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
            fromObject: { client_id: `${client_id}`, view: `${view}`}
          })
      ),
      //ts:ignore
      switchMap((p) => super.delete(id, p))
    );
  }

  updateAlternative(params: any): Observable<any> {
    return this._http.post<any>(`${this._base}/updateAlternative` , params);
  }
}
