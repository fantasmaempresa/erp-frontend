import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { OperationsDto } from '../dto/Operations.dto';
import { Observable } from 'rxjs';

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
    return this._http.post<any>(`${this._base}/filter/documents` , params);
  }
}
