import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { OperationsDto } from '../dto/Operations.dto';
import { map, Observable, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OperationService extends CrudService<
  OperationsDto,
  Pagination<OperationsDto>
> {
  constructor() {
    super('operations');
  }

  getDocuments(params: any): Observable<any> {
    return this._http.post<any>(`${this._base}/filter/documents`, params);
  }
}


@Injectable({
  providedIn: 'root',
})
export class OperationProjectsService extends CrudService<
  OperationsDto,
  Pagination<OperationsDto>
> {

  constructor(private contextService: ViewContextService) {
    super('operations');
  }

  override fetchAll(params?: HttpParams | undefined): Observable<Pagination<OperationsDto>> {
    return super.fetchAll( new HttpParams({
      fromObject: { view:  'projects'},
    }));
  }

}
