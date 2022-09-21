import { CrudOperations } from '../../interfaces/CrudOperations';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Pagination } from '../../interfaces/Pagination.model';
import { EntityDto } from '../../interfaces/Entity.dto';

export abstract class CrudService<T extends EntityDto>
  implements CrudOperations<T>
{
  protected constructor(protected _base: string, protected _http: HttpClient) {
    this._base = `${environment.base_url}/` + this._base;
  }

  save(t: T, params?: HttpParams): Observable<T> {
    return this._http.post<T>(this._base, t, { params });
  }

  update(t: T, params?: HttpParams): Observable<T> {
    const { id } = t;
    return this._http.put<T>(`${this._base}/${id}`, t, { params });
  }

  fetch(id: number, params?: HttpParams): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`, { params });
  }

  fetchAll(params?: HttpParams): Observable<Pagination<T>> {
    return this._http.get<Pagination<T>>(this._base, { params });
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${this._base}/${id}`);
  }
}
