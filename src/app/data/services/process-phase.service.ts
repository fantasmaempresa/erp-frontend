import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { ProcessPhaseDto } from '../dto';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class ProcessPhaseServiceOld extends CrudServiceOld<ProcessPhaseDto> {
  constructor(protected _http: HttpClient) {
    super('phasesProcesses', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<ProcessPhaseDto>>(`${this._base}`, {
      params,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProcessPhaseService extends CrudService<
  ProcessPhaseDto,
  Pagination<ProcessPhaseDto>
> {
  constructor() {
    super('phasesProcesses');
  }
}
