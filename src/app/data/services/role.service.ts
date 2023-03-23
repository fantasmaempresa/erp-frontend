import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RoleDto } from '../dto';
import { CrudService as CrudServiceOld } from '../../core/classes/Crud/CrudService';
import { Pagination as PaginationOld } from '../../core/interfaces';
import { tap } from 'rxjs';
import { CrudService, Pagination } from 'o2c_core';

export const KEY_LS_MENUS = 'menus';

@Injectable({
  providedIn: 'root',
})
export class RoleServiceOld extends CrudServiceOld<RoleDto> {
  constructor(private http: HttpClient) {
    super('roles', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<PaginationOld<RoleDto>>(`${this._base}`, { params });
  }

  getPermissions() {
    return this._http.get(`${this._base}/modules/get`);
  }

  buildSidebar() {
    return this._http.get(`${this._base}/modules/construct`).pipe(
      tap((menus) => {
        localStorage.setItem(KEY_LS_MENUS, JSON.stringify(menus));
      }),
    );
  }
}

@Injectable({ providedIn: 'root' })
export class RoleService extends CrudService<RoleDto, Pagination<RoleDto>> {
  constructor() {
    super('roles');
  }

  getPermissions() {
    return this._http.get(`${this._base}/modules/get`);
  }

  buildSidebar() {
    return this._http.get(`${this._base}/modules/construct`).pipe(
      tap((menus) => {
        localStorage.setItem(KEY_LS_MENUS, JSON.stringify(menus));
      }),
    );
  }
}
