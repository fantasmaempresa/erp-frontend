import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProcessDto } from '../dto/Process.dto';

@Injectable({
  providedIn: 'root',
})
export class ProcessService extends CrudService<ProcessDto> {
  constructor(protected _http: HttpClient) {
    super('processes', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ProcessDto>>(`${this._base}`, { params });
  }
}
