import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces';
import { ProjectDto } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends CrudService<ProjectDto> {
  constructor(protected _http: HttpClient) {
    super('projects', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<ProjectDto>>(`${this._base}`, { params });
  }
}
