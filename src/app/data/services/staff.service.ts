import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StaffDto } from '../dto/Staff.dto';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends CrudService<StaffDto> {
  constructor(private http: HttpClient) {
    super('staff', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<StaffDto>>(`${environment.base_url}/staff`, { params });
  }
}
