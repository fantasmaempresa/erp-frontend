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

  // folio/recommendation/folio

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

  fetchAll(): Observable<Pagination<FolioDto>> {

    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        view: route.snapshot.data.view,
      })),
      map(
        ({view }) =>
          new HttpParams({
            fromObject: {view: `${view}`}
          })
      ),
      switchMap((p) => super.fetchAll(p))
    );
  }

}
