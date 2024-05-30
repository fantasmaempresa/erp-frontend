import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ProcedureDto } from '../dto';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService extends CrudService<
  ProcedureDto,
  Pagination<ProcedureDto>
> {
  constructor() {
    super('procedures');
  }

  checkValueUnique(name: string, id?: number) {
    let idParam = '';
    if (id) {
      idParam = `&id=${id}`;
    }
    return this._http.get(
      `${environment.base_url}/procedure/validator/uniqueValue/${name}?${idParam}`,
    );
  }

  checkFolioMinValueUnique(folio: number, range: string, id?: number) {
    let idParam = '';
    if (id) {
      idParam = `&id=${id}`;
    }
    return this._http.get(
      `${environment.base_url}/procedure/validator/uniqueFolioValue/${folio}?range=${range}${idParam}`,
    );
  }

  assingAdditionalData(procedure_id: number, data: any) {
    return this._http.put(`${environment.base_url}/procedure/grantors/additionalData/${procedure_id}`, data);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProcedureVulnerableOperationService extends CrudService<
  ProcedureDto,
  Pagination<ProcedureDto>
> {
  constructor() {
    super('procedures');
  }

  fetchAll(
    params?: HttpParams | undefined,
    headers?: HttpHeaders | undefined,
  ): any {
    return this._http.get(`${environment.base_url}/procedure/filter/vulnerableOperations`);
  }
}
