import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { FolioDto } from '../dto/Folio.dto';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ProcedureDto } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class FolioService extends CrudService<FolioDto, Pagination<FolioDto>> {
  constructor(private contextService: ViewContextService) {
    super('folio');
  }

  override fetchAll(
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<Pagination<FolioDto>> {
    return super.fetchAll(params, headers).pipe(
      map((pagination) => ({
        ...pagination,
        data: pagination.data.map((folio) => {
          const procedure: ProcedureDto = {
            id: folio?.procedure?.id || 0,
            name: folio?.procedure?.name || 'Sin asignar',
            proceedings: folio?.procedure?.proceedings || '',
            value_operation: folio?.procedure?.value_operation || 0,
            date_proceedings: folio?.procedure?.date_proceedings || '',
            date: folio?.procedure?.date || '',
            credit: folio?.procedure?.credit || '',
            observation: folio?.procedure?.observation || '',
            operation_id: folio?.procedure?.operation_id || 0,
            user_id: folio?.procedure?.user_id || 0,
            place_id: folio?.procedure?.place_id || 0,
            client_id: folio?.procedure?.client_id || 0,
            staff_id: folio?.procedure?.staff_id || 0,
            folio_id: folio?.procedure?.folio_id || 0,
            appraisal: folio?.procedure?.appraisal || '',
            status: folio?.procedure?.status || 0,
          };
          return {
            ...folio,
            procedure,
          };
        }),
      })),
    );
  }

  recommendationInstrument() {
    return this._http.get(
      `${environment.base_url}/folio/recommendation/instrument`,
    );
  }

  recommendationFolio(book_id: number, number_of_folios: number) {
    return this._http.get(
      `${environment.base_url}/folio/recommendation/folio?book_id=${book_id}&number_of_folios=${number_of_folios}`,
    );
  }

  registerErrors(folio_id: number, params: any) {
    return this._http.put(`${this._base}/cancel/${folio_id}`, params);
  }

  unsetProcedure(folio_id: number){
    return this._http.get(`${environment.base_url}/folio/procedure/unused/${folio_id}`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class FolioDialogService extends CrudService<
  FolioDto,
  Pagination<FolioDto>
> {
  constructor(private contextService: ViewContextService) {
    super('folio');
  }

  fetchAll(): Observable<Pagination<FolioDto>> {
    return super.fetchAll(
      new HttpParams({
        fromObject: { view: 'dialog' },
      }),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class OrderFolioService extends CrudService<
  FolioDto,
  Pagination<FolioDto>
> {
  constructor(private contextService: ViewContextService) {
    super('folio');
  }

  fetchAll(params?: HttpParams, headers?: HttpHeaders): Observable<Pagination<FolioDto>> {
    return this._http.get<Pagination<FolioDto>>(`${environment.base_url}/folio/instrument/unused`, { params, headers });
  }
}
