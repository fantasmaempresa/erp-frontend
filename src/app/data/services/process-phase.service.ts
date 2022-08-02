import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { ProcessPhaseDto } from '../dto/ProcessPhase.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../core/interfaces/Pagination.model';

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
    return this._http.get<Pagination<ProcessPhaseDto>>(`${this._base}`, { params });
  }
}
