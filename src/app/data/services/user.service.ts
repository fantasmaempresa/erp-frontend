import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pagination } from '../models/Pagination.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchAll() {
    const url = `${environment.base_url}/users`;
    return this.http.get<Pagination<User>>(url);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
