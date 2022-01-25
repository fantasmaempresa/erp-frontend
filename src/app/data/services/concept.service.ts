import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Concept } from '../models/Concept.model';
import { Pagination } from '../../core/interfaces/Pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ConceptService {
  endpoint = `${environment.base_url}/concepts`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<Concept>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<Concept>(`${this.endpoint}/${id}`);
  }

  create(concept: Concept) {
    return this.http.post<Concept>(`${this.endpoint}`, concept);
  }

  update(concept: Concept) {
    let { id } = concept;
    return this.http.put<Concept>(`${this.endpoint}/${id}`, concept);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<Concept>>(`${environment.base_url}/concepts`, { params });
  }
}
