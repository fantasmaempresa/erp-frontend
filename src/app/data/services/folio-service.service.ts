import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { FolioDto } from '../dto/Folio.dto';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FolioService extends CrudService<FolioDto, Pagination<FolioDto>> {
  constructor(private contextService: ViewContextService) {
    super('folio');
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
    return this._http.put(
      `${this._base}/cancel/${folio_id}`, params
    );
  }
}


@Injectable({
  providedIn: 'root',
})
export class FolioDialogService extends CrudService<FolioDto, Pagination<FolioDto>> {
  constructor(private contextService: ViewContextService) {
    super('folio');
  }

  fetchAll(): Observable<Pagination<FolioDto>> {
    return super.fetchAll(new HttpParams({
      fromObject: {view: 'dialog'},
    }));
  }
}
