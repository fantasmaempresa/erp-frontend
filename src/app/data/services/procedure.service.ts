import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ProcedureDto } from '../dto';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FolioDto } from '../dto/Folio.dto';
import { BookDto } from '../dto/Book.dto';

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

  override fetchAll(
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<Pagination<ProcedureDto>> {
    return super.fetchAll(params, headers).pipe(
      map((pagination) => ({
        ...pagination,
        data: pagination.data.map((procedure) => {
          const book: BookDto = {
            id: 0,
            name: '0',
            folio_min: 0,
            folio_max: 0, 
          }
          const folio: FolioDto = {
              ...(procedure?.folio || {}),
              id: procedure.folio?.id || 0,
              name: procedure.folio?.name || '',
              folio_min: procedure.folio?.folio_min || 0,
              folio_max: procedure.folio?.folio_max || 0,
              book_id: procedure.folio?.book_id || 0,
              user_id: procedure.folio?.user_id || 0,
              book: procedure.folio?.book || book
            };

          return ({
            ...procedure,
            folio,
          });
        }),
      })),
    );
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

  recommendationExpedient() {
    return this._http.get(`${this._base}/recommendation/expedient`);
  }

  notPassedProcedure(data: {id: number, description: string}) {
    return this._http.post(`${this._base}/action/notPassedExpedient`, data);
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
