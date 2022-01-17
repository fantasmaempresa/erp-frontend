import { CrudOperations } from '../../interfaces/CrudOperations';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Pagination } from '../../interfaces/Pagination.model';
import { EntityModel } from '../../interfaces/EntityModel';

export abstract class CrudService<T extends EntityModel> implements CrudOperations<T> {
  protected constructor(protected _base: string, protected _http: HttpClient) {
    this._base = `${environment.base_url}/` + this._base;
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(t: T): Observable<T> {
    const { id } = t;
    return this._http.put<T>(`${this._base}/${id}`, t);
  }

  fetch(id: number): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`);
  }

  fetchAll(): Observable<Pagination<T>> {
    return this._http.get<Pagination<T>>(this._base);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${this._base}/${id}`);
  }
}
