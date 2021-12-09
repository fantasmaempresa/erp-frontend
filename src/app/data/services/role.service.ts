import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pagination } from '../models/Pagination.model';
import { Role } from '../models/Role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  endpoint = `${environment.base_url}/roles`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<Role>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<Role>(`${this.endpoint}/${id}`);
  }

  create(role: Role) {
    return this.http.post<Role>(`${this.endpoint}`, role);
  }

  update(role: Role) {
    let { id } = role;
    return this.http.put<Role>(`${this.endpoint}/${id}`, role);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
