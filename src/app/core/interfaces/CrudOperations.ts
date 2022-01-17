import { Observable } from 'rxjs';

export interface CrudOperations<T> {
  save(t: T): Observable<T>;

  update(t: T): Observable<T>;

  fetch(id: number): Observable<T>;

  fetchAll(): Observable<any>;

  delete(id: number): Observable<any>;
}
