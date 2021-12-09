import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pagination } from '../models/Pagination.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = `${environment.base_url}/users`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<User>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  create(user: User) {
    return this.http.post<User>(`${this.endpoint}`, user);
  }

  update(payload: User) {
    let { id } = payload;
    return this.http.put<User>(`${this.endpoint}/${id}`, payload);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
