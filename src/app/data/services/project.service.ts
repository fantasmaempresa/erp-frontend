import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { ProjectDto } from '../dto/Project.dto';

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
