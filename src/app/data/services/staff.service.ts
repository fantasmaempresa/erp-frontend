import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../models/Pagination.model';
import { Staff } from '../models/Staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  endpoint = `${environment.base_url}/staff`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<Staff>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<Staff>(`${this.endpoint}/${id}`);
  }

  create(staffMember: Staff) {
    return this.http.post<Staff>(`${this.endpoint}`, staffMember);
  }

  update(staffMember: Staff) {
    let { id } = staffMember;
    return this.http.put<Staff>(`${this.endpoint}/${id}`, staffMember);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
