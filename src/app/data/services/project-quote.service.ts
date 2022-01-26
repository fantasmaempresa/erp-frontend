import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectQuote } from '../models/ProjectQuote.model';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectQuoteService extends CrudService<ProjectQuote> {
  constructor(protected http: HttpClient) {
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
}
