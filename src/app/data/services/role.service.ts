import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role.model';
import { CrudService } from '../../core/classes/Crud/CrudService';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends CrudService<Role> {
  constructor(private http: HttpClient) {
    super('roles', http);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
