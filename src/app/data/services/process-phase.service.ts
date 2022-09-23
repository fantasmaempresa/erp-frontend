import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { ProcessPhaseDto } from '../dto';
import { Pagination } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProcessPhaseService extends CrudService<ProcessPhaseDto> {
  constructor(protected _http: HttpClient) {
    super('phasesProcesses', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ProcessPhaseDto>>(`${this._base}`, {
      params,
    });
  }
}
