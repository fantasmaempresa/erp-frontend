import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/User.model';
import { CrudService } from '../../core/classes/Crud/CrudService';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<User> {
  endpoint = `${environment.base_url}/users`;

  constructor(private http: HttpClient) {
    super('users', http);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
