import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { BookDetailDto, BookDto } from '../dto/Book.dto';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { delay, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService extends CrudService<
  BookDto,
  Pagination<BookDto>
> {
  constructor() {
    super('book');
  }
}

@Injectable({
  providedIn: 'root',
})
export class BookDetailService extends CrudService<
  BookDetailDto,
  Pagination<BookDetailDto>
> {
  constructor(private contextService: ViewContextService) {
    super('folio');
  }

  fetchAll(
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<Pagination<any>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => {
        console.log('params --->', route);
        return route.snapshot.params.id ?? 0;
      }),
      switchMap((id) => {
        console.log('params --->', id);
        return this._http.get<Pagination<any>>(
          `${environment.base_url}/folio/unused/${id}`,
        );
      }),
    );
  }

  getGeneralCount() {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => {
        console.log('params --->', route);
        return route.snapshot.params.id ?? 0;
      }),
      switchMap((id) => {
        console.log('params getGeneralCount --->', id);
        return this._http.get(
          `${environment.base_url}/folio/unused/count/${id}`,
        );
      }),
    );
  }
}
