import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Staff } from '../models/Staff.model';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends CrudService<Staff> {
  constructor(private http: HttpClient) {
    super('staff', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<Staff>>(`${environment.base_url}/staff`, { params });
  }
}
