import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { QuoteTemplate } from '../dto';
import { Pagination } from '../../core/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuoteTemplateService extends CrudService<QuoteTemplate> {
  constructor(private http: HttpClient) {
    super('templateQuotes', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<QuoteTemplate>>(
      `${environment.base_url}/templateQuotes`,
      {
        params,
      },
    );
  }
}
