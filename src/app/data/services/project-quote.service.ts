import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectQuote } from '../models/ProjectQuote.model';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';
import { map, Observable, switchMap, take } from 'rxjs';
import { QuoteTemplate } from '../models/QuoteTemplate.model';
import { selectFormToOperations } from '../../state/dynamic-form/dynamic-form.selector';
import { Store } from '@ngrx/store';
import { Operations } from '../models/Operations.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectQuoteService extends CrudService<ProjectQuote> {
  constructor(protected http: HttpClient, private store: Store) {
    super('projectQuotes', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ProjectQuote>>(`${environment.base_url}/projectQuotes`, {
      params,
    });
  }

  calculateOperations(form: any): Observable<Operations> {
    return this._http.post<Operations>(
      `${environment.base_url}/projectQuotes/calculate/reactive`,
      form,
    );
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
}
