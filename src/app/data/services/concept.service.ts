import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConceptDto } from '../dto/Concept.dto';
import { Pagination } from '../../core/interfaces/Pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ConceptService {
  endpoint = `${environment.base_url}/concepts`;

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<Pagination<ConceptDto>>(this.endpoint);
  }

  fetch(id: number) {
    return this.http.get<ConceptDto>(`${this.endpoint}/${id}`);
  }

  create(concept: ConceptDto) {
    return this.http.post<ConceptDto>(`${this.endpoint}`, concept);
  }

  update(concept: ConceptDto) {
    let { id } = concept;
    return this.http.put<ConceptDto>(`${this.endpoint}/${id}`, concept);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<ConceptDto>>(
      `${environment.base_url}/concepts`,
      { params },
    );
  }
}
