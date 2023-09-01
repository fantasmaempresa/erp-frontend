import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDto } from '../dto';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { CrudService, Pagination } from 'o2c_core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceOld extends CrudServiceOld<UserDto> {
  endpoint = `${environment.base_url}/users`;

  constructor(private http: HttpClient) {
    super('users', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<PaginationOld<UserDto>>(`${this.endpoint}`, {
      params,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<UserDto, Pagination<UserDto>> {
  constructor() {
    super('users');
  }

  assignUser(data: { view: string; entity_id: number; user_id: number }) {
    return this._http.post(`${environment.base_url}/user/assign`, data);
  }

  updateMyInfo(data: any) {
    return this._http.post(`${environment.base_url}/user/updateMyInfo`, data);
  }
}
