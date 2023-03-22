import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { ProcessDto } from '../dto';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class ProcessServiceOld extends CrudServiceOld<ProcessDto> {
  constructor(protected _http: HttpClient) {
    super('processes', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<ProcessDto>>(`${this._base}`, {
      params,
    });
  }
}

@Injectable({ providedIn: 'root' })
export class ProcessService extends CrudService<
  ProcessDto,
  Pagination<ProcessDto>
> {
  constructor() {
    super('processes');
  }
}
