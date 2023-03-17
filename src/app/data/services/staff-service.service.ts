import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StaffDto } from '../dto';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { environment } from '../../../environments/environment';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class StaffServiceOld extends CrudServiceOld<StaffDto> {
  constructor(private http: HttpClient) {
    super('staff', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<PaginationOld<StaffDto>>(
      `${environment.base_url}/staff`,
      { params },
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class StaffService extends CrudService<StaffDto, Pagination<StaffDto>> {
  constructor() {
    super('staff');
  }
}
