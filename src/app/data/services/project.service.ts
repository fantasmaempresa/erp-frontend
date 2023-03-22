import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { ProjectDto } from '../dto';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class ProjectServiceOld extends CrudServiceOld<ProjectDto> {
  constructor(protected _http: HttpClient) {
    super('projects', _http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<ProjectDto>>(`${this._base}`, {
      params,
    });
  }
}

@Injectable({ providedIn: 'root' })
export class ProjectService extends CrudService<
  ProjectDto,
  Pagination<ProjectDto>
> {
  constructor() {
    super('projects');
  }
}
