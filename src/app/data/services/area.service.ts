import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../models/Pagination.model';
import { WorkArea } from '../models/WorkArea.model';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  endpoint = `${environment.base_url}/workAreas`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<WorkArea>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<WorkArea>(`${this.endpoint}/${id}`);
  }

  create(workArea: WorkArea) {
    return this.http.post<WorkArea>(`${this.endpoint}`, workArea);
  }

  update(workArea: WorkArea) {
    let { id } = workArea;
    return this.http.put<WorkArea>(`${this.endpoint}/${id}`, workArea);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
