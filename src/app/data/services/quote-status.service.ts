import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuoteStatus } from '../models/QuoteStatus.model';
import { Pagination } from '../../core/interfaces/Pagination.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteStatusService {
  endpoint = `${environment.base_url}/statusQuotes`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<QuoteStatus>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<QuoteStatus>(`${this.endpoint}/${id}`);
  }

  create(quoteStatus: QuoteStatus) {
    return this.http.post<QuoteStatus>(`${this.endpoint}`, quoteStatus);
  }

  update(quoteStatus: QuoteStatus) {
    let { id } = quoteStatus;
    return this.http.put<QuoteStatus>(`${this.endpoint}/${id}`, quoteStatus);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<QuoteStatus>>(`${environment.base_url}/statusQuotes`, {
      params,
    });
  }
}
