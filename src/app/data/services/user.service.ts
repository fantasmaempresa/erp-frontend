import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDto } from '../dto/User.dto';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces/Pagination.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<UserDto> {
  endpoint = `${environment.base_url}/users`;

  constructor(private http: HttpClient) {
    super('users', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this.http.get<Pagination<UserDto>>(`${this.endpoint}`, {
      param,
    });
  }
}
