import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationProcedureDataService extends CrudService<
  RegistrationProcedureDataDto,
  Pagination<RegistrationProcedureDataDto>
> {
  constructor(private contextService: ViewContextService) {
    super('registrationProcedureData');
  }

  fetchAll(): Observable<Pagination<RegistrationProcedureDataDto>> {

    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        procedure_id: route.snapshot.parent?.params.id ?? 0,
      })),
      map(
        ({ procedure_id }) =>
          new HttpParams({
            fromObject: { procedure_id: `${procedure_id}` }
          })
      ),
      switchMap((p) => super.fetchAll(p))
    );
  }

  save(t: any, params?: HttpParams): Observable<any> {
    return this._http.post<any>(this._base, t, { params });
  }

  updateAlternative(id: number, t: any, params?: HttpParams): Observable<any> {
    return this._http.post<any>(`${this._base}/updateAlternative/${id}`, t, { params });
  }
}
