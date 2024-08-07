import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces';
import { Operations } from '../models/Operations.model';
import { ProjectQuoteDto, QuoteTemplate, WorkAreaDto } from '../dto';
import { selectFormToOperations } from '../../state/dynamic-form';
import {
  CrudService as CrudServiceNew,
  Pagination as PaginationNew,
} from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class ProjectQuoteService extends CrudService<ProjectQuoteDto> {
  constructor(protected http: HttpClient, private store: Store) {
    super('projectQuotes', http);
  }

  fetchAllByRole(role: number) {
    if (role !== 1) {
      return this._http.get<Pagination<ProjectQuoteDto>>(
        `${environment.base_url}/projectQuotes/filter/getQuotesByUser`,
      );
    }

    return this._http.get<Pagination<ProjectQuoteDto>>(this._base);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ProjectQuoteDto>>(
      `${environment.base_url}/projectQuotes`,
      {
        params,
      },
    );
  }

  calculateOperations(form: any): Observable<Operations> {
    return this._http.post<Operations>(
      `${environment.base_url}/projectQuotes/calculate/reactive`,
      form,
    );
  }

  fetchByStatus(status: string) {
    let url = `${environment.base_url}/projectQuotes/filter`;
    if (status === 'review') {
      url = `${environment.base_url}/projectQuotes/filter/getQuotesReview`;
    }
    if (status === 'approved') {
      url = `${environment.base_url}/projectQuotes/filter/getQuotesApproved`;
    }
    if (status === 'rejected') {
      url = `${environment.base_url}/projectQuotes/filter/getQuotesFinish`;
    }
    return this._http.get<Pagination<ProjectQuoteDto>>(url);
  }

  resolveOperations(quoteTemplate: QuoteTemplate) {
    return this.store.select(selectFormToOperations(quoteTemplate)).pipe(
      take(1),
      switchMap((quote) =>
        this.calculateOperations({ ...quote }).pipe(
          map((resp: Operations) => this.mapOperations(resp)),
        ),
      ),
    );
  }

  mapOperations(operations: Operations) {
    const operationFields: [] = operations.operation_fields;
    const operationTotal = operations.operation_total;
    const concepts: any[] = [];
    for (const opt in operationFields) {
      const data: any = operationFields[opt];
      data.name = opt;
      concepts.push(data);
    }
    let total = {
      name: 'total',
      description: operationTotal.description,
      subtotal: operationTotal.subtotal,
      total: operationTotal.total,
    };
    return {
      operation_fields: concepts,
      operation_total: total,
    };
  }

  getReportProjectQuote(projectQuote: ProjectQuoteDto) {
    return this._http.post(
      `${environment.base_url}/projectQuote/getReport`,
      projectQuote,
      {
        responseType: 'blob',
        observe: 'response',
      }
    );
  }
}
@Injectable({
  providedIn: 'root',
})
export class ProjectQuoteServiceNew extends CrudServiceNew<
  ProjectQuoteDto,
  PaginationNew<ProjectQuoteDto>
> {
  constructor() {
    super('projectQuotes');
  }
}
