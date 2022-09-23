import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuoteStatusDto } from '../dto';
import { Pagination } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuoteStatusService {
  endpoint = `${environment.base_url}/statusQuotes`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<QuoteStatusDto>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<QuoteStatusDto>(`${this.endpoint}/${id}`);
  }

  create(quoteStatus: QuoteStatusDto) {
    return this.http.post<QuoteStatusDto>(`${this.endpoint}`, quoteStatus);
  }

  update(quoteStatus: QuoteStatusDto) {
    let { id } = quoteStatus;
    return this.http.put<QuoteStatusDto>(`${this.endpoint}/${id}`, quoteStatus);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<QuoteStatusDto>>(
      `${environment.base_url}/statusQuotes`,
      {
        params,
      },
    );
  }
}
