import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WorkAreaDto } from '../dto';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { environment } from '../../../environments/environment';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class AreaServiceOld extends CrudServiceOld<WorkAreaDto> {
  constructor(private http: HttpClient) {
    super('workAreas', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<WorkAreaDto>>(
      `${environment.base_url}/workAreas`,
      { params },
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AreaService extends CrudService<
  WorkAreaDto,
  Pagination<WorkAreaDto>
> {
  constructor() {
    super('workAreas');
  }
}
