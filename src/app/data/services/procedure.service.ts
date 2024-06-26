import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ProcedureDto } from '../dto';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

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

  checkValueInstrumentUnique(name: string, id?: number) {
    let idParam = '';
    if (id) {
      idParam = `&id=${id}`;
    }
    return this._http.get(
      `${environment.base_url}/procedure/validator/uniqueInstrumentValue/${name}?${idParam}`,
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
    return this._http.put(
      `${environment.base_url}/procedure/grantors/additionalData/${procedure_id}`,
      data,
    );
  }

  graphsRegistered() {
    return this._http.get(
      `${environment.base_url}/procedure/graphics/registered`,
    );
  }

  graphsWithoutData() {
    return this._http.get(
      `${environment.base_url}/procedure/graphics/withoutData`,
    );
  }

  graphsWithoutShape() {
    return this._http.get(
      `${environment.base_url}/procedure/graphics/withoutShape`,
    );
  }

  graphsWithoutDocument() {
    return this._http.get(
      `${environment.base_url}/procedure/graphics/withoutDocument`,
    );
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
    return this._http.get(
      `${environment.base_url}/procedure/filter/vulnerableOperations`,
    );
  }
}
